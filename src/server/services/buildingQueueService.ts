import { CapitalCondition } from '../_models/buildings/buildingConditions';
import { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding';
import { BuildingSpot } from '../_models/buildings/spots/buildingSpot';
import { Village } from '../_models/village/village';
import { BuildingType } from '../../_shared/types/buildingType';
import { getAccountContext } from '../accountContext';
import { dataPathService } from './dataPathService';
import { fileService } from './fileService';
import { buildingInfoService } from './info/buildingInfoService';

export type EnqueuedBuilding = {
  readonly fieldId: number;
  readonly targetLevel: number | null;
  readonly type: BuildingType;
};

export type DequeueAtFieldInput = {
  readonly deleteAll: boolean;
  readonly fieldId: number;
};

export enum MovingDirection {
  Up = -1,
  Down = 1,
}

export class BuildingQueueService {
  private readonly _village: Village;
  private readonly _filePath: string;

  constructor(villageId: number) {
    this._village = getAccountContext().villageService.village(villageId);
    this._filePath = dataPathService.villagePath(villageId).queue;
  }

  private serializeQueue = async (): Promise<void> => fileService.save(this._filePath, this._village.buildings.queue.buildings());

  public loadQueue = async (): Promise<void> => {
    const buildings = fileService.load<QueuedBuilding[]>(this._filePath, []);
    this._village.buildings.queue.set(buildings);
    this._village.buildings.updateSpotsQueuedState();
  };

  public enqueueBuilding = (building: EnqueuedBuilding): void => {
    const {
      fieldId,
      targetLevel,
      type,
    } = building;

    const spot = this._village.buildings.spots.at(fieldId);
    const totalLevel = spot.level.getTotal();
    const { maxLevel } = buildingInfoService.getBuildingInfo(type);

    const levels = targetLevel
      ? targetLevel - totalLevel
      : 1;

    let enqueued = false;

    for (let i = 1; i <= levels; i++) {
      const level = totalLevel + i;

      if (level > maxLevel) {
        break;
      }

      const queueId = `${fieldId}-${type}-${level}-${Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0, 8)}`;
      const qBuilding = {
        fieldId,
        level,
        queueId,
        type,
      };

      this._village.buildings.queue.add(qBuilding);

      enqueued = true;
    }

    if (enqueued) {
      this.onUpdate();
    }
  };

  public dequeueBuilding = (queueId: string, correctQueue: boolean): void => {
    const removedCount = this._village.buildings.queue.remove(queueId);

    if (removedCount <= 0) {
      return;
    }

    if (!correctQueue || !this.correctBuildingQueue().wasQueryCorrected) {
      this.onUpdate();
    }
  };

  public dequeueBuildingAtField = (input: DequeueAtFieldInput): void => {
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

    if (!this.correctBuildingQueue()) {
      this.onUpdate();
    }
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

    this.onUpdate();
    return true;
  };

  public moveAsHighAsPossible = (queueId: string): void => {
    // key: fieldId, value: queued offset
    const offsets: Record<number, number> = {};
    const queuedBuildings = this._village.buildings.queue.buildings();

    const spots = this._village.buildings.spots.buildings();
    spots.forEach(spot => {
      offsets[spot.fieldId] = 0;
    });

    const movedBuilding = queuedBuildings.find(b => b.queueId === queueId);

    if (!movedBuilding) {
      return;
    }

    const queueIndex = this._village.buildings.queue.buildings().findIndex(b => b.queueId === queueId);

    if (queueIndex === 0) {
      return;
    }

    let newIndex: number | undefined;

    for (let i = 0; i < queueIndex; i++) {
      if (this.willQueuedBuildingStillMeetItsRequirements(movedBuilding, offsets)) {
        newIndex = i;
        break;
      }

      const qBuilding = queuedBuildings[i];
      offsets[qBuilding.fieldId]++;
    }

    if (newIndex === undefined) {
      return;
    }

    this._village.buildings.queue.move(queueIndex, newIndex);
    this.onUpdate();
  };

  public clearQueue = (): void => {
    if (!this._village.buildings.queue.buildings().length) {
      return;
    }

    this._village.buildings.queue.clear();

    this.onUpdate();
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

    // moving up/down and its same id/type as next/previous level too so cant move more up
    if (buildingInTheWay.fieldId === building.fieldId
      && buildingInTheWay.level === building.level + direction) {
      return false;
    }

    let qBuildingWithPossiblyAffectedRequirements: QueuedBuilding;
    let theOtherBuilding: BuildingSpot | undefined;

    const normalizedBuildings = this._village.buildings.spots.buildings();

    if (isMovingUp) {
      qBuildingWithPossiblyAffectedRequirements = building;
      theOtherBuilding = normalizedBuildings.find(b => b.fieldId === buildingInTheWay.fieldId);
    } else {
      qBuildingWithPossiblyAffectedRequirements = buildingInTheWay;
      theOtherBuilding = normalizedBuildings.find(b => b.fieldId === building.fieldId);
    }

    if (!theOtherBuilding) {
      throw new Error('Did not find other building while trying to move in queue');
    }

    // need to calculate offset till its position
    const offsets: Record<number, number> = {};
    const queuedBuildings = this._village.buildings.queue.buildings();

    const spots = this._village.buildings.spots.buildings();
    spots.forEach(spot => {
      offsets[spot.fieldId] = 0;
    });

    for (const qBuilding of queuedBuildings) {
      if (qBuilding.queueId === qBuildingWithPossiblyAffectedRequirements.queueId) {
        break;
      }

      offsets[qBuilding.fieldId]++;
    }

    offsets[theOtherBuilding.fieldId]--;

    return this.willQueuedBuildingStillMeetItsRequirements(
      qBuildingWithPossiblyAffectedRequirements,
      offsets,
    );
  };

  private willQueuedBuildingStillMeetItsRequirements = (checkedBuilding: QueuedBuilding, offsets: Record<number, number>): boolean => {
    const normalizedBuildings = this._village.buildings.spots.buildings();

    const getNewTotalLevel = (building: BuildingSpot): number =>
      building.level.getActualAndOngoing()
      + offsets[building.fieldId];

    const { conditions } = buildingInfoService.getBuildingInfo(checkedBuilding.type);

    //  should have parent, lvl1 also has a parent: with lvl 0
    const hasParent = normalizedBuildings.some(s => s.fieldId === checkedBuilding.fieldId
      && getNewTotalLevel(s) === checkedBuilding.level - 1);

    if (!hasParent) {
      return false;
    }

    if (checkedBuilding.type <= BuildingType.Crop) {
      return true;
    }

    if (checkedBuilding.level === 1) {
      //  unique buildings test.. if it has same type on another field it should be maxed at least somewhere
      const { maxLevel } = buildingInfoService.getBuildingInfo(checkedBuilding.type);

      const buildingsOfTheType = normalizedBuildings.filter(b => b.type === checkedBuilding.type);
      const anyCompleted = buildingsOfTheType.some(b => getNewTotalLevel(b) >= maxLevel);

      //  if none is completed but other of the same type exist then we cant move it
      if (!anyCompleted && buildingsOfTheType.length > 1) {
        return false;
      }

      for (let i = 0; i < conditions.requiredBuildings.length; i++) {
        const requiredBuilding = conditions.requiredBuildings[i];
        const requiredBuildingExists = normalizedBuildings.some(
          b => b.type === requiredBuilding.type
            && getNewTotalLevel(b) >= requiredBuilding.level,
        );

        if (!requiredBuildingExists) {
          return false;
        }
      }
    }

    return true;
  };

  public correctBuildingQueue = () => {
    const offsets: Record<number, number> = {};

    const spots = this._village.buildings.spots.buildings();

    spots.forEach(spot => {
      offsets[spot.fieldId] = 0;
    });

    let wasQueryCorrected: boolean = false;

    this._village.buildings.queue.buildings().forEach(qBuilding => {
      const shouldBeRemoved = this.shouldRemoveBuildingFromQueue(qBuilding, offsets);

      if (shouldBeRemoved) {
        this._village.buildings.queue.remove(qBuilding.queueId);
        wasQueryCorrected = true;
      } else {
        offsets[qBuilding.fieldId]++;
      }
    });

    if (wasQueryCorrected) {
      this.onUpdate();
    }

    return { wasQueryCorrected };
  };

  public getMainBuildingLevels = (): Record<string, number> => {
    const { buildings } = this._village;
    const mainBuilding = buildings.spots.ofType(BuildingType.MainBuilding);
    let baseMbLevel = mainBuilding ? mainBuilding.level.getActualAndOngoing() : 0;

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
      && getAccountContext().villageService.allVillages().some(otherVillage =>
        otherVillage.id !== this._village.id
        && getAccountContext().villageService.village(otherVillage.id).buildings.spots.buildings().some(b => b.type === BuildingType.Palace))) {
      // iba 1 palac
      return true;
    }

    const normalizedBuildings = this._village.buildings.spots.buildings();

    // if buildings lvl >= 2, the building with previous level should exist on the same field
    if (queuedBuilding.level >= 2) {
      const previousLevelBuildingExists = normalizedBuildings.some(b =>
        b.type === queuedBuilding.type
        && b.fieldId === queuedBuilding.fieldId
        && (
          b.level.getActualAndOngoing()
          + providedOffsets[queuedBuilding.fieldId]
          + 1
        ) === queuedBuilding.level);

      if (!previousLevelBuildingExists) {
        return true;
      }
    }

    const { conditions, maxLevel } = buildingInfoService.getBuildingInfo(queuedBuilding.type);

    if ((conditions.capital === CapitalCondition.Prohibited && this._village.isCapital)
      || (conditions.capital === CapitalCondition.Required && !this._village.isCapital)) {
      return true;
    }

    if (queuedBuilding.level === 1) {
      // dolezite iba ked sa stava nove
      const prohibitedBuildingExists = normalizedBuildings.some(
        b => b.level.getActualAndOngoing() + providedOffsets[b.fieldId] > 0
          && conditions.prohibitedBuildingTypes.includes(b.type),
      );

      if (prohibitedBuildingExists) {
        return true;
      }

      if (queuedBuilding.type > BuildingType.Crop) {
        // u resource je jedno
        const sameTypeBuildings = normalizedBuildings.filter(b => b.type === queuedBuilding.type);

        if (conditions.isUnique) {
          // existuje nejaka budova, rozstavana alebo v queue az po tialto
          const existingBuilding = sameTypeBuildings.find(
            b => b.level.getActualAndOngoing() + providedOffsets[b.fieldId]
              > 0,
          );

          if (!!existingBuilding
            && existingBuilding.fieldId !== queuedBuilding.fieldId) {
            return true;
          }
        } else {
          const existingBuildings = sameTypeBuildings.map(
            b => ({
              fieldId: b.fieldId,
              totalLevel:
                b.level.getActualAndOngoing()
                + providedOffsets[b.fieldId],
            }),
          )
            .filter(b => b.totalLevel > 0);

          if (existingBuildings.length > 0) {
            const isAnyCompleted = existingBuildings.some(b => b.totalLevel >= maxLevel);

            if (!isAnyCompleted) {
              // ked neni unikatna ani ziadna kompletna tak z tych co existuju sa aspon
              // 1 musi zhodovat s tym co stavame
              const anyExists = existingBuildings.some(
                b => b.fieldId === queuedBuilding.fieldId,
              );

              if (!anyExists) {
                return true;
              }
            }
          }
        }
      }

      for (let i = 0; i < conditions.requiredBuildings.length; i++) {
        const requiredBuilding = conditions.requiredBuildings[i];
        const requiredBuildingExists = normalizedBuildings.some(
          b => b.type === requiredBuilding.type
            && b.level.getActualAndOngoing() + providedOffsets[b.fieldId]
            >= requiredBuilding.level,
        );

        if (!requiredBuildingExists) {
          return true;
        }
      }
    }

    return false;
  };

  private onUpdate = async (): Promise<void> => {
    this._village.buildings.updateSpotsQueuedState();
    await this.serializeQueue();
  };
}
