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

type RangeToRemove = {
  readonly buildings: readonly QueuedBuilding[];
};

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
      const qBuilding = new QueuedBuilding({
        fieldId,
        level,
        queueId,
        type,
      });

      const lastQueuedBuilding = this._village.buildings.queue.peekLast();

      this._village.buildings.queue.add(qBuilding);
      qBuilding.canMoveUp = i === 1
        ? this.canMoveQueuedBuilding(queueId, MovingDirection.Up)
        : false;

      if (lastQueuedBuilding) {
        lastQueuedBuilding.canMoveDown = qBuilding.canMoveUp;
      }

      enqueued = true;
    }

    if (enqueued) {
      this.onUpdate();
    }
  };

  private updateCanMoveFlags = (rangeToRemove: RangeToRemove): void => {
    const firstBuilding = rangeToRemove.buildings[0];
    const lastBuilding = rangeToRemove.buildings[rangeToRemove.buildings.length - 1];

    const previousBuilding = this._village.buildings.queue.getPrevious(firstBuilding.queueId);
    const followingBuilding = this._village.buildings.queue.getFollowing(lastBuilding.queueId);

    if (previousBuilding) {
      previousBuilding.canMoveDown = this.canMoveQueuedBuilding(previousBuilding.queueId, MovingDirection.Up);
    }
    if (followingBuilding) {
      followingBuilding.canMoveUp = this.canMoveQueuedBuilding(followingBuilding.queueId, MovingDirection.Down);
    }
  };

  public removeAndCorrectQueue = (queueIds: string[] = []): void => {
    const rangesToRemove = this.correctBuildingQueue(queueIds);

    for (const rangeToRemove of rangesToRemove) {
      this.updateCanMoveFlags(rangeToRemove);
    }

    const idsToRemove = rangesToRemove.flatMap(range => range.buildings).map(b => b.queueId);
    const removedCount = this._village.buildings.queue.removeBulk(idsToRemove);

    if (removedCount) {
      this.onUpdate();
    }
  };

  public dequeueBuilding = (queueId: string, correctQueue: boolean): void => {
    if (correctQueue) {
      //  handles updates too
      this.removeAndCorrectQueue([queueId]);
    } else {
      const bToRemove = this._village.buildings.queue.buildings().find(b => b.queueId === queueId);

      if (!bToRemove) {
        return;
      }

      this.updateCanMoveFlags({ buildings: [bToRemove] });

      const removedCount = this._village.buildings.queue.remove(queueId);

      if (removedCount > 0) {
        this.onUpdate();
      }
    }
  };

  public dequeueBuildingAtField = (input: DequeueAtFieldInput): void => {
    const {
      deleteAll,
      fieldId,
    } = input;

    if (deleteAll) {
      const buildings = this._village.buildings.queue.getAllAtField(fieldId);
      this.removeAndCorrectQueue(buildings.map(b => b.queueId));
    } else {
      const building = this._village.buildings.queue.getLastAtField(fieldId);

      if (!building) {
        return;
      }

      this.removeAndCorrectQueue([building.queueId]);
    }
  };

  public moveQueuedBuilding = (queueId: string, direction: MovingDirection): void => {
    const building = this._village.buildings.queue.buildings().find(b => b.queueId === queueId);

    if (!building) {
      return;
    }

    if (direction === MovingDirection.Up && !building.canMoveUp
      || direction === MovingDirection.Down && !building.canMoveDown) {
      return;
    }

    const index = this._village.buildings.queue.buildings().indexOf(building);
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex > (this._village.buildings.queue.buildings().length - 1)) {
      return;
    }

    const otherBuilding = this._village.buildings.queue.buildings()[newIndex];

    this._village.buildings.queue.swap(index, newIndex);

    const higherBuilding = direction === MovingDirection.Down
      ? otherBuilding
      : building;

    const lowerBuilding = direction === MovingDirection.Down
      ? building
      : otherBuilding;

    higherBuilding.canMoveUp = this.canMoveQueuedBuilding(higherBuilding.queueId, MovingDirection.Up);
    lowerBuilding.canMoveDown = this.canMoveQueuedBuilding(lowerBuilding.queueId, MovingDirection.Down);
    // they can swap back
    higherBuilding.canMoveDown = true;
    lowerBuilding.canMoveUp = true;

    const previousBuilding = this._village.buildings.queue.getPrevious(higherBuilding.queueId);
    const followingBuilding = this._village.buildings.queue.getFollowing(lowerBuilding.queueId);

    if (previousBuilding) {
      previousBuilding.canMoveDown = this.canMoveQueuedBuilding(previousBuilding.queueId, MovingDirection.Down);
    }
    if (followingBuilding) {
      followingBuilding.canMoveUp = this.canMoveQueuedBuilding(followingBuilding.queueId, MovingDirection.Up);
    }

    this.onUpdate();
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

    movedBuilding.canMoveUp = false;
    movedBuilding.canMoveDown = true;

    const initialPreviousBuilding = this._village.buildings.queue.getPrevious(movedBuilding.queueId);
    const initialFollowingBuilding = this._village.buildings.queue.getFollowing(movedBuilding.queueId);

    if (initialPreviousBuilding) {
      initialPreviousBuilding.canMoveDown = this.canMoveQueuedBuilding(initialPreviousBuilding.queueId, MovingDirection.Down);
    }
    if (initialFollowingBuilding) {
      initialFollowingBuilding.canMoveUp = this.canMoveQueuedBuilding(initialFollowingBuilding.queueId, MovingDirection.Up);
    }

    this._village.buildings.queue.swap(queueIndex, newIndex);

    const previousBuilding = this._village.buildings.queue.getPrevious(movedBuilding.queueId);
    const followingBuilding = this._village.buildings.queue.getFollowing(movedBuilding.queueId);

    if (previousBuilding) {
      previousBuilding.canMoveDown = false;
    }
    if (followingBuilding) {
      followingBuilding.canMoveUp = true;
    }

    this.onUpdate();
  };

  public clearQueue = (): void => {
    if (!this._village.buildings.queue.buildings().length) {
      return;
    }

    this._village.buildings.queue.clear();

    this.onUpdate();
  };

  private canMoveQueuedBuilding = (queueId: string, direction: MovingDirection): boolean => {
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

  private correctBuildingQueue = (queueIdsToBeRemoved: string[] = []): readonly RangeToRemove[] => {
    const offsets: Record<number, number> = {};

    const spots = this._village.buildings.spots.buildings();

    spots.forEach(spot => {
      offsets[spot.fieldId] = 0;
    });

    const buildings = this._village.buildings.queue.buildings();

    const ranges: RangeToRemove[] = [];

    let lastIndexToRemove = -1;
    let lastRangeBuildings: QueuedBuilding[] = [];

    const push = (index: number, bToRemove: QueuedBuilding): void => {
      if (index - lastIndexToRemove === 1) {
        lastRangeBuildings.push(bToRemove);
      } else {
        ranges.push({ buildings: lastRangeBuildings });
        lastRangeBuildings = [bToRemove];
      }
    };

    for (const [i, qBuilding] of buildings.entries()) {
      if (queueIdsToBeRemoved.includes(qBuilding.queueId)) {
        push(i, qBuilding);
      } else {
        const shouldBeRemoved = this.shouldRemoveBuildingFromQueue(qBuilding, offsets);

        if (shouldBeRemoved) {
          push(i, qBuilding);
        } else {
          offsets[qBuilding.fieldId]++;
        }
      }

      lastIndexToRemove = i;
    }

    if (lastRangeBuildings.length) {
      ranges.push({ buildings: lastRangeBuildings });
    }

    return ranges;
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
