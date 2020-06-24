import { CapitalCondition } from '../_models/buildings/buildingConditions';
import { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding';
import { BuildingSpot } from '../_models/buildings/spots/buildingSpot';
import { BuildingType } from '../_models/enums/buildingType';
import { Village } from '../_models/village/village';
import { getAccountContext } from '../accountContext';
import { accountService } from './accountService';
import { dataPathService } from './dataPathService';
import { fileService } from './fileService';
import { buildingInfoService } from './info/buildingInfoService';

export type EnqueuedBuilding = {
  readonly fieldId: number;
  readonly targetLevel?: number;
  readonly type: BuildingType;
};

export type DequeueAtFieldInput = {
  readonly targetLevel?: number;
  readonly fieldId: number;
};

type RangeToRemove = {
  readonly buildings: readonly QueuedBuilding[];
};

// key - fieldId, value - number of queued buildings on that field
class Offsets {
  private _offsets: Map<number, number> = new Map<number, number>();

  public getFor = (fieldId: number): number => this._offsets.get(fieldId) ?? 0;

  public increaseFor = (fieldId: number): void => {
    this._offsets.set(fieldId, this.getFor(fieldId) + 1);
  };
}

export class BuildingQueueService {
  private readonly _village: Village;

  private readonly _filePath: string;

  private readonly _canMoveToIndexFlags: Map<
    string,
    Map<number, boolean>
  > = new Map<string, Map<number, boolean>>();

  private readonly _canMoveBlockToIndexFlags: Map<
    string,
    Map<number, boolean>
  > = new Map<string, Map<number, boolean>>();

  constructor(villageId: string) {
    const { id: accountId } = accountService.getCurrentAccount();
    this._village = getAccountContext().villageService.village(villageId);
    this._filePath = dataPathService.villagePath(accountId, villageId).queue;
  }

  private serializeQueue = async (): Promise<void> =>
    fileService.save(this._filePath, this._village.buildings.queue.buildings());

  public loadQueue = async (): Promise<void> => {
    const buildings = fileService.load<QueuedBuilding[]>(this._filePath, []);
    this._village.buildings.queue.set(buildings);
    this._village.buildings.updateSpotsQueuedState();
  };

  public setQueue = (buildings: QueuedBuilding[]) => {
    this._village.buildings.queue.set(buildings);
    this.onUpdate();
  };

  public enqueueBuilding = (building: EnqueuedBuilding): void => {
    const { fieldId, targetLevel, type } = building;

    const spot = this._village.buildings.spots.at(fieldId);
    const totalLevel = spot.level.getTotal();
    const { maxLevel } = buildingInfoService.getBuildingInfo(type);

    const levels = targetLevel ? targetLevel - totalLevel : 1;

    let enqueued = false;

    for (let i = 1; i <= levels; i++) {
      const level = totalLevel + i;

      if (level > maxLevel) {
        break;
      }

      const queueId = `${fieldId}-${type}-${level}-${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .slice(0, 8)}`;
      const qBuilding = new QueuedBuilding({
        fieldId,
        level,
        queueId,
        type,
      });

      this._village.buildings.queue.add(qBuilding);

      enqueued = true;
    }

    if (enqueued) {
      this.onUpdate();
    }
  };

  public removeAndCorrectQueue = (queueIds: string[] = []): void => {
    const rangesToRemove = this.correctBuildingQueue(queueIds);
    const idsToRemove = rangesToRemove
      .flatMap((range) => range.buildings)
      .map((b) => b.queueId);
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
      const bToRemove = this._village.buildings.queue
        .buildings()
        .find((b) => b.queueId === queueId);

      if (!bToRemove) {
        return;
      }

      const removedCount = this._village.buildings.queue.remove(queueId);

      if (removedCount > 0) {
        this.onUpdate();
      }
    }
  };

  public dequeueBuildingsBlock = (
    topBuildingQueueId: string,
    bottomBuildingQueueId: string,
  ): void => {
    const topIndex = this._village.buildings.queue
      .buildings()
      .findIndex((b) => b.queueId === topBuildingQueueId);
    const botIndex = this._village.buildings.queue
      .buildings()
      .findIndex((b) => b.queueId === bottomBuildingQueueId);

    const idsToRemove = this._village.buildings.queue
      .buildings()
      .slice(topIndex, botIndex + 1)
      .map((b) => b.queueId);

    this.removeAndCorrectQueue(idsToRemove);
  };

  public dequeueBuildingAtField = ({
    fieldId,
    targetLevel,
  }: DequeueAtFieldInput): void => {
    if (targetLevel) {
      const buildings = this._village.buildings.queue.getAllAtField(
        fieldId,
        (b) => b.level > targetLevel,
      );
      this.removeAndCorrectQueue(buildings.map((b) => b.queueId));
    } else {
      const building = this._village.buildings.queue.getLastAtField(fieldId);

      if (!building) {
        return;
      }

      this.removeAndCorrectQueue([building.queueId]);
    }
  };

  public moveAsHighAsPossible = (queueId: string): void => {
    const offsets = new Offsets();
    const queuedBuildings = this._village.buildings.queue.buildings();

    const movedBuilding = queuedBuildings.find((b) => b.queueId === queueId);

    if (!movedBuilding) {
      return;
    }

    const queueIndex = this._village.buildings.queue
      .buildings()
      .findIndex((b) => b.queueId === queueId);

    if (queueIndex === 0) {
      return;
    }

    let newIndex: number | undefined;

    for (let i = 0; i < queueIndex; i++) {
      if (
        this.willQueuedBuildingStillMeetItsRequirements(movedBuilding, offsets)
      ) {
        newIndex = i;
        break;
      }

      const qBuilding = queuedBuildings[i];
      offsets.increaseFor(qBuilding.fieldId);
    }

    if (newIndex === undefined) {
      return;
    }

    this._village.buildings.queue.moveTo(queueIndex, newIndex);

    this.onUpdate();
  };

  public moveBlockAsHighAsPossible = (
    topBuildingQueueId: string,
    bottomBuildingQueueId: string,
  ): void => {
    if (topBuildingQueueId || bottomBuildingQueueId) {
      throw new Error('Not implemented yet');
    } else {
      throw new Error('Not implemented yet');
    }
  };

  private updateCanMoveToIndexFlags = (
    queueId: string,
    newIndex: number,
    flag: boolean,
  ): void => {
    let flags = this._canMoveToIndexFlags.get(queueId);

    if (!flags) {
      flags = new Map<number, boolean>();
    }

    flags.set(newIndex, flag);
  };

  private updateCanMoveBlockToIndexFlags = (
    topBuildingQueueId: string,
    bottomBuildingQueueId: string,
    newIndex: number,
    flag: boolean,
  ) => {
    const mergedId = `${topBuildingQueueId}_${bottomBuildingQueueId}`;
    let flags = this._canMoveBlockToIndexFlags.get(mergedId);

    if (!flags) {
      flags = new Map<number, boolean>();
    }

    flags.set(newIndex, flag);
  };

  public canMoveBuildingToIndex = (
    queueId: string,
    newIndex: number,
  ): boolean => {
    const flags = this._canMoveToIndexFlags.get(queueId);
    const flag = flags && flags.get(newIndex);

    if (flag !== undefined) {
      return flag;
    }

    const buildings = this._village.buildings.queue.buildings();
    const currentIndex = buildings.findIndex((b) => b.queueId === queueId);

    if (currentIndex === newIndex) {
      this.updateCanMoveToIndexFlags(queueId, newIndex, false);
      return false;
    }

    const isGoingDown = currentIndex < newIndex;

    if (isGoingDown) {
      // if going down then recalculate for every building on the way
      const offsets = new Offsets();

      for (const [i, qBuilding] of buildings.entries()) {
        if (qBuilding.queueId === queueId) {
          continue;
        }

        if (
          isGoingDown &&
          !this.willQueuedBuildingStillMeetItsRequirements(qBuilding, offsets)
        ) {
          this.updateCanMoveToIndexFlags(queueId, newIndex, false);
          return false;
        }

        if (i === newIndex) {
          break;
        }

        offsets.increaseFor(qBuilding.fieldId);
      }

      this.updateCanMoveToIndexFlags(queueId, newIndex, true);
      return true;
    }

    // going up
    const offsets = new Offsets();

    for (const [i, qBuilding] of buildings.entries()) {
      if (i === newIndex) {
        break;
      }

      offsets.increaseFor(qBuilding.fieldId);
    }

    const building = buildings[currentIndex];
    const result = this.willQueuedBuildingStillMeetItsRequirements(
      building,
      offsets,
    );
    this.updateCanMoveToIndexFlags(queueId, newIndex, result);
    return result;
  };

  public canMoveBuildingsBlockToIndex = (
    topBuildingQueueId: string,
    bottomBuildingQueueId: string,
    newIndex: number,
  ): boolean => {
    const mergedId = `${topBuildingQueueId}_${bottomBuildingQueueId}`;
    const flags = this._canMoveBlockToIndexFlags.get(mergedId);
    const flag = flags && flags.get(newIndex);

    if (flag !== undefined) {
      return flag;
    }

    const buildings = this._village.buildings.queue.buildings();
    const currentTopIndex = buildings.findIndex(
      (b) => b.queueId === topBuildingQueueId,
    );
    const currentBotIndex = buildings.findIndex(
      (b) => b.queueId === bottomBuildingQueueId,
    );

    if (currentTopIndex >= currentBotIndex || currentTopIndex === newIndex) {
      this.updateCanMoveBlockToIndexFlags(
        topBuildingQueueId,
        bottomBuildingQueueId,
        newIndex,
        false,
      );
      return false;
    }

    const isGoingDown = currentTopIndex < newIndex;

    if (isGoingDown) {
      // if going down then recalculate for every building on the way
      const offsets = new Offsets();

      for (const [i, qBuilding] of buildings.entries()) {
        if (i >= currentTopIndex && i <= currentBotIndex) {
          continue;
        }

        if (
          isGoingDown &&
          !this.willQueuedBuildingStillMeetItsRequirements(qBuilding, offsets)
        ) {
          this.updateCanMoveBlockToIndexFlags(
            topBuildingQueueId,
            bottomBuildingQueueId,
            newIndex,
            false,
          );
          return false;
        }

        if (i === newIndex) {
          break;
        }

        offsets.increaseFor(qBuilding.fieldId);
      }

      this.updateCanMoveBlockToIndexFlags(
        topBuildingQueueId,
        bottomBuildingQueueId,
        newIndex,
        true,
      );
      return true;
    }

    // going up
    const offsets = new Offsets();

    for (const [i, qBuilding] of buildings.entries()) {
      if (i === newIndex) {
        break;
      }

      offsets.increaseFor(qBuilding.fieldId);
    }

    const buildingsToMoveCount = currentBotIndex - currentTopIndex + 1;

    for (let i = 0; i < buildingsToMoveCount; i++) {
      const building = buildings[currentTopIndex + i];
      const result = this.willQueuedBuildingStillMeetItsRequirements(
        building,
        offsets,
      );

      if (!result) {
        this.updateCanMoveBlockToIndexFlags(
          topBuildingQueueId,
          bottomBuildingQueueId,
          newIndex,
          false,
        );
        return false;
      }

      offsets.increaseFor(building.fieldId);
    }

    this.updateCanMoveBlockToIndexFlags(
      topBuildingQueueId,
      bottomBuildingQueueId,
      newIndex,
      true,
    );
    return true;
  };

  public moveBuildingToIndex = (queueId: string, newIndex: number): void => {
    const currentIndex = this._village.buildings.queue
      .buildings()
      .findIndex((b) => b.queueId === queueId);

    if (!this.canMoveBuildingToIndex(queueId, newIndex)) {
      return;
    }

    this._village.buildings.queue.moveTo(currentIndex, newIndex);

    this.onUpdate();
  };

  public moveQueuedBuildingsBlockToIndex = (
    topBuildingQueueId: string,
    bottomBuildingQueueId: string,
    newIndex: number,
  ): void => {
    const topBuildingCurrentIndex = this._village.buildings.queue
      .buildings()
      .findIndex((b) => b.queueId === topBuildingQueueId);
    const bottomBuildingCurrentIndex = this._village.buildings.queue
      .buildings()
      .findIndex((b) => b.queueId === bottomBuildingQueueId);

    if (topBuildingCurrentIndex >= bottomBuildingCurrentIndex) {
      return;
    }

    if (
      !this.canMoveBuildingsBlockToIndex(
        topBuildingQueueId,
        bottomBuildingQueueId,
        newIndex,
      )
    ) {
      return;
    }

    const buildingsToMoveCount =
      bottomBuildingCurrentIndex - topBuildingCurrentIndex + 1;
    this._village.buildings.queue.moveBlockTo(
      topBuildingCurrentIndex,
      buildingsToMoveCount,
      newIndex,
    );

    this.onUpdate();
  };

  public clearQueue = (): void => {
    if (!this._village.buildings.queue.buildings().length) {
      return;
    }

    this._village.buildings.queue.clear();

    this.onUpdate();
  };

  private willQueuedBuildingStillMeetItsRequirements = (
    checkedBuilding: QueuedBuilding,
    offsets: Offsets,
  ): boolean => {
    const normalizedBuildings = this._village.buildings.spots.buildings();

    const getNewTotalLevel = (building: BuildingSpot): number =>
      building.level.getActualAndOngoing() + offsets.getFor(building.fieldId);

    const { conditions } = buildingInfoService.getBuildingInfo(
      checkedBuilding.type,
    );

    //  should have parent, lvl1 also has a parent: with lvl 0
    const hasParent = normalizedBuildings.some(
      (s) =>
        s.fieldId === checkedBuilding.fieldId &&
        getNewTotalLevel(s) === checkedBuilding.level - 1,
    );

    if (!hasParent) {
      return false;
    }

    if (checkedBuilding.type <= BuildingType.Crop) {
      return true;
    }

    if (checkedBuilding.level === 1) {
      //  unique buildings test.. if it has same type on another field it should be maxed at least somewhere
      const { maxLevel } = buildingInfoService.getBuildingInfo(
        checkedBuilding.type,
      );

      const buildingsOfTheType = normalizedBuildings.filter(
        (b) => b.type === checkedBuilding.type,
      );
      const anyCompleted = buildingsOfTheType.some(
        (b) => getNewTotalLevel(b) >= maxLevel,
      );

      //  if none is completed but other of the same type exist then we cant move it
      if (!anyCompleted && buildingsOfTheType.length > 1) {
        return false;
      }

      for (let i = 0; i < conditions.requiredBuildings.length; i++) {
        const requiredBuilding = conditions.requiredBuildings[i];
        const requiredBuildingExists = normalizedBuildings.some(
          (b) =>
            b.type === requiredBuilding.type &&
            getNewTotalLevel(b) >= requiredBuilding.level,
        );

        if (!requiredBuildingExists) {
          return false;
        }
      }
    }

    return true;
  };

  private correctBuildingQueue = (
    queueIdsToBeRemoved: string[] = [],
  ): readonly RangeToRemove[] => {
    const offsets = new Offsets();

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
        const shouldBeRemoved = this.shouldRemoveBuildingFromQueue(
          qBuilding,
          offsets,
        );

        if (shouldBeRemoved) {
          push(i, qBuilding);
        } else {
          offsets.increaseFor(qBuilding.fieldId);
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
    let baseMbLevel = mainBuilding
      ? mainBuilding.level.getActualAndOngoing()
      : 0;

    return buildings.queue.buildings().reduce((reduced, building) => {
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

  private shouldRemoveBuildingFromQueue = (
    queuedBuilding: QueuedBuilding,
    providedOffsets: Offsets,
  ): boolean => {
    if (
      queuedBuilding.type === BuildingType.Palace &&
      getAccountContext()
        .villageService.allVillages()
        .some(
          (otherVillage) =>
            otherVillage.id !== this._village.id &&
            getAccountContext()
              .villageService.village(otherVillage.id)
              .buildings.spots.buildings()
              .some((b) => b.type === BuildingType.Palace),
        )
    ) {
      // iba 1 palac
      return true;
    }

    const normalizedBuildings = this._village.buildings.spots.buildings();

    // if buildings lvl >= 2, the building with previous level should exist on the same field
    if (queuedBuilding.level >= 2) {
      const previousLevelBuildingExists = normalizedBuildings.some(
        (b) =>
          b.type === queuedBuilding.type &&
          b.fieldId === queuedBuilding.fieldId &&
          b.level.getActualAndOngoing() +
            providedOffsets.getFor(queuedBuilding.fieldId) +
            1 ===
            queuedBuilding.level,
      );

      if (!previousLevelBuildingExists) {
        return true;
      }

      return false;
    }

    // it is level 1

    const { conditions, maxLevel } = buildingInfoService.getBuildingInfo(
      queuedBuilding.type,
    );

    if (
      (conditions.capital === CapitalCondition.Prohibited &&
        this._village.isCapital) ||
      (conditions.capital === CapitalCondition.Required &&
        !this._village.isCapital)
    ) {
      return true;
    }

    const prohibitedBuildingExists = normalizedBuildings.some(
      (b) =>
        b.level.getActualAndOngoing() + providedOffsets.getFor(b.fieldId) > 0 &&
        conditions.prohibitedBuildingTypes.includes(b.type),
    );

    if (prohibitedBuildingExists) {
      return true;
    }

    if (queuedBuilding.type > BuildingType.Crop) {
      // u resource je jedno
      const sameTypeBuildings = normalizedBuildings.filter(
        (b) => b.type === queuedBuilding.type,
      );

      if (conditions.isUnique) {
        // existuje nejaka budova, rozstavana alebo v queue az po tialto
        const existingBuilding = sameTypeBuildings.find(
          (b) =>
            b.level.getActualAndOngoing() + providedOffsets.getFor(b.fieldId) >
            0,
        );

        if (existingBuilding) {
          return true;
        }
      } else {
        const existingBuildings = sameTypeBuildings
          .map((b) => ({
            fieldId: b.fieldId,
            totalLevel:
              b.level.getActualAndOngoing() + providedOffsets.getFor(b.fieldId),
          }))
          .filter((b) => b.totalLevel > 0);

        if (existingBuildings.length > 0) {
          const isAnyCompleted = existingBuildings.some(
            (b) => b.totalLevel >= maxLevel,
          );

          if (!isAnyCompleted) {
            // ked neni unikatna ani ziadna kompletna tak z tych co existuju sa aspon
            // 1 musi zhodovat s tym co stavame
            const anyExists = existingBuildings.some(
              (b) => b.fieldId === queuedBuilding.fieldId,
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
        (b) =>
          b.type === requiredBuilding.type &&
          b.level.getActualAndOngoing() + providedOffsets.getFor(b.fieldId) >=
            requiredBuilding.level,
      );

      if (!requiredBuildingExists) {
        return true;
      }
    }

    return false;
  };

  private onUpdate = async (): Promise<void> => {
    this._village.buildings.updateSpotsQueuedState();
    this._canMoveToIndexFlags.clear();
    this._canMoveBlockToIndexFlags.clear();
    await this.serializeQueue();
  };
}
