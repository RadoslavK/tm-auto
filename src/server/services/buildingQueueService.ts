import { BuildingType } from '../_enums/BuildingType';
import { CapitalCondition } from '../_models/buildings/buildingConditions';
import { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding';
import { Village } from '../_models/village/village';
import { IBuildingSpot } from '../_types/graphql';
import { Events } from '../graphql/subscriptions/events';
import { publishPayloadEvent } from '../graphql/subscriptions/pubSub';
import { buildingInfos } from '../bootstrap/loadInfo';
import { getWithMaximum } from '../utils/getWithMaximum';
import { villagesService } from './villageService';
import { logException } from '../../../_shared/utils/logException';

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

export class BuildingQueueService {
  private readonly m_village: Village;

  constructor(villageId: number) {
    this.m_village = villagesService.get().village(villageId);
  }

  public enqueueBuilding = (building: IEnqueuedBuilding): void => {
    const {
      type,
      fieldId,
      levels,
    } = building;

    const spot = this.m_village.buildings.spots.at(fieldId);
    const totalLevel = spot.level.total();
    const { maxLevel } = buildingInfos[type];
    let enqueued = false;

    for (let i = 1; i <= levels; i++) {
      const level = totalLevel + i;

      if (level > maxLevel) {
        break;
      }

      const queueId = `${fieldId}-${type}-${level}-${Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0, 8)}`;
      const qBuilding = new QueuedBuilding({
        fieldId,
        level,
        type,
        queueId,
      });

      this.m_village.buildings.queue.add(qBuilding);
      spot.level.queued++;
      enqueued = true;
    }

    if (enqueued) {
      publishPayloadEvent(Events.QueuedUpdated, { villageId: this.m_village.id });
    }
  };

  public dequeueBuilding = (queueId: string): void => {
    const removedCount = this.m_village.buildings.queue.remove(queueId);
    if (removedCount <= 0) {
      return;
    }

    this.correctBuildingQueue();
    publishPayloadEvent(Events.QueuedUpdated, { villageId: this.m_village.id });
  };

  public dequeueBuildingAtField = (input: IDequeueAtFieldInput): void => {
    const {
      deleteAll,
      fieldId,
    } = input;

    const removedCount = deleteAll
      ? this.m_village.buildings.queue.removeAllAtField(fieldId)
      : this.m_village.buildings.queue.removeLastAtField(fieldId);

    if (removedCount <= 0) {
      return;
    }

    this.correctBuildingQueue();
    publishPayloadEvent(Events.QueuedUpdated, { villageId: this.m_village.id });
  };

  public moveQueuedBuilding = (queueId: string, direction: MovingDirection): boolean => {
    if (!this.canMoveQueuedBuilding(queueId, direction)) {
      return false;
    }

    if (direction === MovingDirection.Up) {
      this.m_village.buildings.queue.moveUp(queueId);
    } else {
      this.m_village.buildings.queue.moveDown(queueId);
    }

    return true;
  };

  public clearQueue = (): void => {
    if (!this.m_village.buildings.queue.buildings().length) {
      return;
    }

    this.m_village.buildings.queue.clear();
    const spots = this.m_village.buildings.spots.buildings();

    spots.forEach(spot => {
      spot.level.queued = 0;
    });

    publishPayloadEvent(Events.QueuedUpdated, { villageId: this.m_village.id });
  };

  public canMoveQueuedBuilding = (queueId: string, direction: MovingDirection): boolean => {
    const queueIndex = this.m_village.buildings.queue.buildings().findIndex(b => b.queueId === queueId);

    if (queueIndex === -1) {
      return false;
    }

    const newIndex = queueIndex + direction;
    if (newIndex < 0 || newIndex >= this.m_village.buildings.queue.buildings().length) {
      return false;
    }

    const building = this.m_village.buildings.queue.buildings()[queueIndex];
    const buildingInTheWay = this.m_village.buildings.queue.buildings()[queueIndex + direction];

    const isMovingUp = direction === MovingDirection.Up;

    // moving up/down and its same id/type as next/previous level too so cant move more up
    if (buildingInTheWay.fieldId === building.fieldId
      && buildingInTheWay.level === building.level + direction) {
      return false;
    }

    let qBuildingWithPossiblyAffectedRequirements: QueuedBuilding;
    let theOtherBuilding: IBuildingSpot | undefined;

    const normalizedBuildings = this.m_village.buildings.normalizedBuildingSpots();

    if (isMovingUp) {
      qBuildingWithPossiblyAffectedRequirements = building;
      theOtherBuilding = normalizedBuildings.find(b => b.fieldId === buildingInTheWay.fieldId);
    } else {
      qBuildingWithPossiblyAffectedRequirements = buildingInTheWay;
      theOtherBuilding = normalizedBuildings.find(b => b.fieldId === building.fieldId);
    }

    if (!theOtherBuilding) {
      throw logException('Did not find other building while trying to move in queue');
    }

    return this.willQueuedBuildingStillMeetItsRequirementsAfterRepositioning(
      qBuildingWithPossiblyAffectedRequirements,
      theOtherBuilding.fieldId,
    );
  };

  private willQueuedBuildingStillMeetItsRequirementsAfterRepositioning = (checkedBuilding: QueuedBuilding, reducedOffsetBuildingFieldId: number): boolean => {
    // need to calculate offset till its position
    const offsets: Record<number, number> = {};
    const queuedBuildings = this.m_village.buildings.queue.buildings();

    const spots = this.m_village.buildings.spots.buildings();
    spots.forEach(spot => {
      offsets[spot.fieldId] = 0;
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const qBuilding of queuedBuildings) {
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

    const normalizedBuildings = this.m_village.buildings.normalizedBuildingSpots();
    const { conditions } = buildingInfos[checkedBuilding.type];

    if (conditions.type > BuildingType.Crop) {
      const { maxLevel } = buildingInfos[checkedBuilding.type];

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

        // if they are not the same building spot or its level is not preceding to this then theres a problem
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

    const spots = this.m_village.buildings.spots.buildings();

    spots.forEach(spot => {
      offsets[spot.fieldId] = 0;
    });

    this.m_village.buildings.queue.buildings().forEach(qBuilding => {
      const shouldBeRemoved = this.shouldRemoveBuildingFromQueue(qBuilding, offsets);

      if (shouldBeRemoved) {
        this.m_village.buildings.queue.remove(qBuilding.queueId);
      } else {
        offsets[qBuilding.fieldId]++;
      }
    });

    spots.forEach(spot => {
      spot.level.queued = offsets[spot.fieldId];
    })
  };

  public getMainBuildingLevels = (): Record<string, number> => {
    const { buildings } = this.m_village;
    const mainBuilding = buildings.spots.ofType(BuildingType.MainBuilding);
    let baseMbLevel = mainBuilding ? mainBuilding.level.actual + mainBuilding.level.ongoing : 0;

    return buildings.queue
      .buildings()
      .reduce((reduced, building) => {
        const { queueId } = building;
        const baseMbLevelForThisBuilding = baseMbLevel;

        if (building.type === BuildingType.MainBuilding) {
          baseMbLevel++;
        }

        return {
          ...reduced,
          [queueId]: baseMbLevelForThisBuilding,
        };
      }, {} as Record<string, number>);
  };

  private shouldRemoveBuildingFromQueue = (queuedBuilding: QueuedBuilding, providedOffsets: Record<number, number>): boolean => {
    if (queuedBuilding.type === BuildingType.Palace
      && villagesService.get().all().some(otherVillage =>
        otherVillage.id !== this.m_village.id
        && villagesService.get().village(otherVillage.id).buildings.normalizedBuildingSpots().some(b => b.type === BuildingType.Palace))) {
      // iba 1 palac
      return true;
    }

    const normalizedBuildings = this.m_village.buildings.normalizedBuildingSpots();

    const previousLevelBuildingExists = normalizedBuildings.some(b =>
      b.type === queuedBuilding.type
      && b.fieldId === queuedBuilding.fieldId
      && (b.level.actual
      + b.level.ongoing
      + providedOffsets[queuedBuilding.fieldId]
      + 1)
      === queuedBuilding.level);

    // mala by existovat budova s predoslym lvl
    if (!previousLevelBuildingExists) {
      return true;
    }

    const { conditions } = buildingInfos[queuedBuilding.type];

    if ((conditions.capital === CapitalCondition.Prohibited && this.m_village.isCapital)
      || (conditions.capital === CapitalCondition.Required && !this.m_village.isCapital)) {
      return true;
    }

    if (queuedBuilding.level === 1) {
      // dolezite iba ked sa stava nove
      const prohibitedBuildingExists = normalizedBuildings.some(
        b => b.level.actual + b.level.ongoing + providedOffsets[b.fieldId] > 0
          && conditions.prohibitedBuildingTypes.includes(b.type));

      if (prohibitedBuildingExists) {
        return true;
      }

      if (conditions.type > BuildingType.Crop) {
        // u resource je jedno
        const sameTypeBuildings = normalizedBuildings.filter(b => b.type === conditions.type);

        if (conditions.isUnique) {
          // existuje nejaka budova, rozstavana alebo v queue az po tialto
          const existingBuilding = sameTypeBuildings.find(
            b => b.level.actual + b.level.ongoing + providedOffsets[b.fieldId]
              > 0);

          if (!!existingBuilding
            && existingBuilding.fieldId !== queuedBuilding.fieldId) {
            return true;
          }
        } else {
          const { maxLevel } = buildingInfos[conditions.type];

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
              // ked neni unikatna ani ziadna kompletna tak z tych co existuju sa aspon
              // 1 musi zhodovat s tym co stavame
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
        // dolezite iba ked sa stava nove
        for (let i = 0; i < conditions.requiredBuildings.length; i++) {
          const requiredBuilding = conditions.requiredBuildings[i];
          const requiredBuildingExists = normalizedBuildings.some(
            b => b.type === requiredBuilding.type
              && b.level.actual + b.level.ongoing + providedOffsets[b.fieldId]
              >= requiredBuilding.level);

          if (!requiredBuildingExists) {
            return true;
          }
        }
      }

      return false;
    }

    return false;
  };
}
