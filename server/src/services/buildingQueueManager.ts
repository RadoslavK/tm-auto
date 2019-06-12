import { BuildingType } from '../_enums/BuildingType';
import { CapitalCondition } from '../_models/buildings/buildingConditions';
import { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding';
import { Village } from '../_models/village/village';
import { IBuildingSpot } from '../_types/graphql';
import { context } from '../graphql/context';
import { buildingInfos, buildingsConditions } from '../index';
import { getWithMaximum } from '../utils/getWithMaximum';

export interface IEnqueuedBuilding {
  readonly fieldId: number;
  readonly levels: number;
  readonly type: BuildingType;
}

export interface IDequeueAtFieldInput {
  readonly deleteAll: boolean;
  readonly fieldId: number;
}

export enum MovingDirection {
  Up = -1,
  Down = 1,
}

export class BuildingQueueManager {
  private readonly _village: Village;

  constructor(villageId: number) {
    this._village = context.villages.village(villageId);
  }

  public enqueueBuilding = (building: IEnqueuedBuilding): void => {
    const {
      type,
      fieldId,
      levels,
    } = building;

    const spot = this._village.buildings.spots[fieldId];
    const totalLevel = spot.level.total();
    const maxLevel = buildingInfos[type].length;

    for (let i = 1; i <= levels; i++) {
      const level = totalLevel + i;

      if (level > maxLevel) {
        return;
      }

      const queueId = `${fieldId}-${type}-${level}-${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)}`;
      const building: QueuedBuilding = new QueuedBuilding({
        fieldId,
        level,
        type,
        queueId,
      });

      this._village.buildings.queue.add(building);
      spot.level.queued++;
    }
  };

  public dequeueBuilding = (queueId: string): void => {
    const removedCount = this._village.buildings.queue.remove(queueId);
    if (removedCount <= 0) {
      return;
    }

    this.correctBuildingQueue();
  };

  public dequeueBuildingAtField = (input: IDequeueAtFieldInput): void => {
    const {
      deleteAll,
      fieldId,
    } = input;

    const removedCount = deleteAll
      ? this._village.buildings.queue.removeAllAtField(fieldId)
      : this._village.buildings.queue.removeLastAtField(fieldId);

    if (removedCount <= 0) {
      return;
    }

    this.correctBuildingQueue();
  };

  public moveQueuedBuilding = (queueId: string, direction: MovingDirection): boolean => {
    if (!this.canMoveQueuedBuilding(queueId, direction)) {
      return false;
    }

    if (direction === MovingDirection.Up) {
      this._village.buildings.queue.moveUp(queueId);
    } else {
      this._village.buildings.queue.moveDown(queueId);
    }

    return true;
  };

  public clearQueue = (): void => {
    this._village.buildings.queue.clear();
    const spots = Object.values(this._village.buildings.spots);

    spots.forEach(spot => {
      spot.level.queued = 0;
    });
  };

  public canMoveQueuedBuilding = (queueId: string, direction: MovingDirection): boolean => {
    const queueIndex = this._village.buildings.queue.buildings().findIndex(b => b.queueId === queueId);

    if (queueIndex === -1) {
      return false;
    }

    const newIndex = queueIndex + direction;
    if (newIndex < 0 || newIndex >= this._village.buildings.queue.buildings().length) {
      return false;
    }

    const building = this._village.buildings.queue.buildings()[queueIndex];
    const buildingInTheWay = this._village.buildings.queue.buildings()[queueIndex + direction];

    const isMovingUp = direction === MovingDirection.Up;

    //moving up/down and its same id/type as next/previous level too so cant move more up
    if (buildingInTheWay.fieldId === building.fieldId
      && buildingInTheWay.level === building.level + direction) {
      return false;
    }

    let qBuildingWithPossiblyAffectedRequirements: QueuedBuilding;
    let theOtherBuilding: IBuildingSpot;

    const normalizedBuildings = this._village.buildings.normalizedBuildingSpots();

    if (isMovingUp) {
      qBuildingWithPossiblyAffectedRequirements = building;
      theOtherBuilding = normalizedBuildings.find(b => b.fieldId === buildingInTheWay.fieldId);
    } else {
      qBuildingWithPossiblyAffectedRequirements = buildingInTheWay;
      theOtherBuilding = normalizedBuildings.find(b => b.fieldId == building.fieldId);
    }

    return this.willQueuedBuildingStillMeetItsRequirementsAfterRepositioning(
      qBuildingWithPossiblyAffectedRequirements,
      theOtherBuilding.fieldId,
    );
  };

  private willQueuedBuildingStillMeetItsRequirementsAfterRepositioning = (checkedBuilding: QueuedBuilding, reducedOffsetBuildingFieldId: number): boolean => {
    // need to calculate offset till its position
    const offsets: Record<number, number> = {};
    const queuedBuildings = this._village.buildings.queue.buildings();

    const spots = Object.values(this._village.buildings.spots);
    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
      offsets[spot.fieldId] = 0;
    }

    for (let i = 0; i < queuedBuildings.length; i++) {
      const qBuilding = queuedBuildings[i];
      offsets[qBuilding.fieldId]++;

      if (qBuilding.queueId === checkedBuilding.queueId) {
        break;
      }
    }

    return this.willQueuedBuildingStillMeetItsRequirementsAfterRepositioningOther(
      checkedBuilding,
      offsets,
      reducedOffsetBuildingFieldId,
    );
  };

  private willQueuedBuildingStillMeetItsRequirementsAfterRepositioningOther = (checkedBuilding: QueuedBuilding, offsets: Record<number, number>, reducedOffsetBuildingFieldId?: number): boolean => {
    const getTemporaryTotalLevel = (building: IBuildingSpot): number =>
      building.level.actual
      + building.level.ongoing
      + (building.fieldId === reducedOffsetBuildingFieldId
      ? offsets[building.fieldId] - 1
      : offsets[building.fieldId]);

    const normalizedBuildings = this._village.buildings.normalizedBuildingSpots();
    const conditions = buildingsConditions[checkedBuilding.type];

    if (conditions.type > BuildingType.Crop) {
      const maxLevel = buildingInfos[checkedBuilding.type].length;

      const anyCompleted = normalizedBuildings
        .filter(b => b.type === checkedBuilding.type)
        .some(b => getTemporaryTotalLevel(b) >= maxLevel);

      if (!anyCompleted) {
        // if not unique, but at least 1 is not fully completed
        // it can break down on queue switch
        const highestLevelBuildingOfSameType = getWithMaximum(
          normalizedBuildings.filter(b => b.type === checkedBuilding.type),
          getTemporaryTotalLevel,
        );

        if (!highestLevelBuildingOfSameType) {
          return false;
        }

        const itsTemporaryLevel = getTemporaryTotalLevel(highestLevelBuildingOfSameType);

        //if they are not the same building spot or its level is not preceding to this then theres a problem
        if (highestLevelBuildingOfSameType.fieldId !== checkedBuilding.fieldId || (itsTemporaryLevel < checkedBuilding.level - 1)) {
          return false;
        }
      }
    }

    for (let i = 0; i < conditions.requiredBuildings.length; i++)
    {
      const requiredBuilding = conditions.requiredBuildings[i];
      const requiredBuildingExists = normalizedBuildings.some(
        b => b.type === requiredBuilding.type
          && getTemporaryTotalLevel(b) >= requiredBuilding.level);

      if (!requiredBuildingExists) {
        return false;
      }
    }

    return true;
  };

  public correctBuildingQueue = (): void => {
    const offsets: Record<number, number> = {};

    const spots = Object.values(this._village.buildings.spots);

    spots.forEach(spot => {
      offsets[spot.fieldId] = 0;
    });

    this._village.buildings.queue.buildings().forEach(qBuilding => {
      const shouldBeRemoved = this.shouldRemoveBuildingFromQueue(qBuilding, offsets);

      if (shouldBeRemoved) {
        this._village.buildings.queue.remove(qBuilding.queueId);
      } else {
        offsets[qBuilding.fieldId]++;
      }
    });

    spots.forEach(spot => {
      spot.level.queued = offsets[spot.fieldId];
    })
  };

  private shouldRemoveBuildingFromQueue = (queuedBuilding: QueuedBuilding, providedOffsets: Record<number, number>): boolean => {
    if (queuedBuilding.type === BuildingType.Palace
      && context.villages.all().some(otherVillage =>
        otherVillage.id !== this._village.id
        && context.villages.village(otherVillage.id).buildings.normalizedBuildingSpots().some(b => b.type === BuildingType.Palace))) {
      //iba 1 palac
      return true;
    }

    const normalizedBuildings = this._village.buildings.normalizedBuildingSpots();

    const previousLevelBuildingExists = normalizedBuildings.some(b =>
      b.type === queuedBuilding.type
      && b.fieldId === queuedBuilding.fieldId
      && (b.level.actual
      + b.level.ongoing
      + providedOffsets[queuedBuilding.fieldId]
      + 1)
      === queuedBuilding.level);

    //mala by existovat budova s predoslym lvl
    if (!previousLevelBuildingExists) {
      return true;
    }

    const conditions = buildingsConditions[queuedBuilding.type];

    if ((conditions.capital === CapitalCondition.Prohibited && this._village.isCapital)
      || (conditions.capital === CapitalCondition.Required && !this._village.isCapital)) {
      return true;
    }

    if (queuedBuilding.level == 1) {
      //dolezite iba ked sa stava nove
      const prohibitedBuildingExists = normalizedBuildings.some(
        b => b.level.actual + b.level.ongoing + providedOffsets[b.fieldId] > 0
          && conditions.prohibitedBuildingTypes.includes(b.type));

      if (prohibitedBuildingExists) {
        return true;
      }

      if (conditions.type > BuildingType.Crop) {
        //u resource je jedno
        const sameTypeBuildings = normalizedBuildings.filter(b => b.type === conditions.type);

        if (conditions.isUnique) {
          // existuje nejaka budova, rozstavana alebo v queue az po tialto
          const existingBuilding = sameTypeBuildings.find(
            b => b.level.actual + b.level.ongoing + providedOffsets[b.fieldId]
              > 0);

          if (!!existingBuilding
            && existingBuilding.fieldId != queuedBuilding.fieldId) {
            return true;
          }
        } else {
          const maxLevel = buildingInfos[conditions.type].length;

          const existingBuildings = sameTypeBuildings.map(
            b => ({
              totalLevel:
                b.level.actual
                + b.level.ongoing
                + providedOffsets[b.fieldId],
              fieldId: b.fieldId,
            }))
            .filter(b => b.totalLevel > 0);


          if (existingBuildings.length > 0) {
            const isAnyCompleted =
              existingBuildings.some(b => b.totalLevel >= maxLevel);

            if (!isAnyCompleted) {
              //ked neni unikatna ani ziadna kompletna tak z tych co existuju sa aspon
              //1 musi zhodovat s tym co stavame
              const anyExists = existingBuildings.some(
                b => b.fieldId === queuedBuilding.fieldId);

              if (!anyExists) {
                return true;
              }
            }
          }
        }
      }

      if (queuedBuilding.level === 1) {
        //dolezite iba ked sa stava nove
        for (let i = 0; i < conditions.requiredBuildings.length; i++) {
          {
            const requiredBuilding = conditions.requiredBuildings[i];
            const requiredBuildingExists = normalizedBuildings.some(
              b => b.type == requiredBuilding.type
                && b.level.actual + b.level.ongoing + providedOffsets[b.fieldId]
                >= requiredBuilding.level);

            if (!requiredBuildingExists) {
              return true;
            }
          }
        }
      }

      return false;
    }
  };
}
