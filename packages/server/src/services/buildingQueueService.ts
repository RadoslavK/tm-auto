import { BuildingType } from 'shared/enums/BuildingType.js';

import { CapitalCondition } from '../_models/buildings/buildingConditions.js';
import type { BuildingQueue } from '../_models/buildings/queue/buildingQueue.js';
import type { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding.js';
import type { BuildingSpot } from '../_models/buildings/spots/buildingSpot.js';
import type { Village } from '../_models/village/village.js';
import { AccountContext } from '../accountContext.js';
import { BotEvent } from '../events/botEvent.js';
import { publishPayloadEvent } from '../pubSub.js';
import { accountService } from './accountService.js';
import { EnqueueBuildingService } from './buildingQueue/enqueueBuildingService.js';
import { MergeBuildingsService } from './buildingQueue/mergeBuildingsService.js';
import { SplitBuildingService } from './buildingQueue/splitBuildingService.js';
import { dataPathService } from './dataPathService.js';
import { fileService } from './fileService.js';
import { buildingInfoService } from './info/buildingInfoService.js';

export type DequeueAtFieldInput = {
  readonly targetLevel?: number | null;
  readonly fieldId: number;
};

type RemoveAndCorrectParams = {
  readonly forceUpdate?: boolean;
  readonly queueIds?: ReadonlySet<string>;
  readonly triggerCorrectionEvent?: boolean;
};

type ModificationResult = {
  readonly removedBuildings: readonly QueuedBuilding[];
  readonly updatedBuildings: readonly QueuedBuilding[];
};

export enum DequeueMode {
  AutomaticLastLevel,
  FromApi,
}

type DequeueParams = {
  readonly level?: number | null;
  readonly mode: DequeueMode;
  readonly queueId: string;
};

type WillMeetRequirementsParams = {
  readonly checkedBuilding: QueuedBuilding,
  readonly offsets?: Offsets;
  readonly ignoreOngoing?: boolean;
};

// key - fieldId, value - number of queued levels on that field
class Offsets {
  private _offsets: Map<number, number> = new Map<number, number>();

  public getFor = (fieldId: number): number => this._offsets.get(fieldId) ?? 0;

  public increaseFor = (fieldId: number, increment: number): void => {
    this._offsets.set(fieldId, this.getFor(fieldId) + increment);
  };
}

export class BuildingQueueService {
  public readonly enqueue: EnqueueBuildingService;
  public readonly split: SplitBuildingService;
  public readonly merge: MergeBuildingsService;

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
    this._village = AccountContext.getContext().villageService.village(villageId);
    this._filePath = dataPathService.villagePath(accountId, villageId).queue;

    this.enqueue = new EnqueueBuildingService(villageId, (hasChanges) => this.onUpdate(hasChanges));
    this.split = new SplitBuildingService(villageId, (hasChanges) => this.onUpdate(hasChanges));
    this.merge = new MergeBuildingsService(villageId, (hasChanges) => this.onUpdate(hasChanges));
  }

  private serializeQueue = async (): Promise<void> =>
    fileService.save(this._filePath, this._village.buildings.queue.buildings());

  public loadQueueAndUpdate = async (): Promise<void> => {
    const buildings = fileService.load<QueuedBuilding[]>(this._filePath, []);
    this._village.buildings.queue.set(buildings);
    this._village.buildings.updateSpotsQueuedState();
  };

  public setQueue = async (buildings: QueuedBuilding[]): Promise<void> => {
    this._village.buildings.queue.set(buildings);
    await this.onUpdate();
  };

  public removeAndCorrectQueue = async (params?: RemoveAndCorrectParams): Promise<ReadonlyArray<QueuedBuilding>> => {
    const {
      forceUpdate,
      queueIds = new Set<string>(),
      triggerCorrectionEvent,
    } = params || {};

    const idsToRemove = this.correctBuildingQueue(queueIds);
    const removedBuildings = this._village.buildings.queue.removeBulk(idsToRemove);

    if (triggerCorrectionEvent && removedBuildings.length) {
      publishPayloadEvent(BotEvent.BuildingQueueCorrected, {
        removedBuildings,
        villageId: this._village.id,
      });
    }

    if (forceUpdate || removedBuildings.length) {
      this.onUpdate();
    }

    return removedBuildings;
  };

  public dequeueBuilding = async ({
    level,
    mode,
    queueId,
  }: DequeueParams): Promise<ModificationResult> => {
    const { queue } = this._village.buildings;
    const building = queue.buildings().find(b => b.id === queueId);

    if (!building) {
      return {
        updatedBuildings: [],
        removedBuildings: [],
      };
    }

    if (mode === DequeueMode.FromApi) {
      let shouldRemoveWholeBuilding = false;

      if (typeof level === 'number') {
        if (level < building.startingLevel || level > building.targetLevel) {
          return {
            removedBuildings: [],
            updatedBuildings: [],
          };
        }

        if (level === building.startingLevel) {
          shouldRemoveWholeBuilding = true;
        } else {
          building.targetLevel = level - 1;
        }
      } else {
        shouldRemoveWholeBuilding = true;
      }

      //  handles updates too
      const removedBuildings = await this.removeAndCorrectQueue({
        queueIds: new Set<string>(shouldRemoveWholeBuilding ? [queueId] : []),
        //  No building was removed but was updated so trigger update
        forceUpdate: !shouldRemoveWholeBuilding,
      });

      return {
        removedBuildings,
        updatedBuildings: shouldRemoveWholeBuilding ? [] : [building],
      };
    } else {
      const villageId = this._village.id;

      if (building.startingLevel === building.targetLevel) {
        const removedBuildings = queue.remove(queueId);
        this.onUpdate(!!removedBuildings.length);

        publishPayloadEvent(BotEvent.QueuedBuildingUpdated, {
          type: 'removed',
          queuedBuilding: building,
          villageId,
        });

        return {
          removedBuildings,
          updatedBuildings: [],
        };
      } else {
        building.startingLevel++;
        this.onUpdate(true);

        publishPayloadEvent(BotEvent.QueuedBuildingUpdated, {
          type: 'changed',
          queuedBuilding: building,
          villageId,
        });

        return {
          updatedBuildings: [building],
          removedBuildings: [],
        };
      }
    }
  };

  public dequeueBuildingAtField = async ({ fieldId, targetLevel }: DequeueAtFieldInput): Promise<{
    readonly removedBuildings: ReadonlyArray<QueuedBuilding>,
    readonly updatedBuilding?: QueuedBuilding,
  }> => {
    const { queue } = this._village.buildings;

    if (typeof targetLevel === 'number') {
      const buildingsToRemove = queue.getAllAtField(fieldId, (b) =>
        b.startingLevel > targetLevel);

      const buildingToCorrect = queue.getLastAtField(fieldId, b =>
        targetLevel >= b.startingLevel && targetLevel < b.targetLevel);

      if (buildingToCorrect) {
        buildingToCorrect.targetLevel = targetLevel;
      }

      const queueIds = new Set<string>(buildingsToRemove.map((b) => b.id));
      const forceUpdate = !!buildingToCorrect;
      const removedBuildings = await this.removeAndCorrectQueue({
        queueIds,
        forceUpdate,
      });

      return {
        removedBuildings,
      };
    } else {
      // Dequeue 1 level only
      const building = queue.getLastAtField(fieldId);

      if (!building) {
        return {
          removedBuildings: [],
        };
      }

      if (building.startingLevel === building.targetLevel) {
        //  Remove whole building
        const removedBuildings = await this.removeAndCorrectQueue({
          queueIds: new Set<string>([building.id]),
        });

        return {
          removedBuildings,
        };
      } else {
        building.targetLevel--;

        const removedBuildings = await this.removeAndCorrectQueue({
          forceUpdate: true,
        });

        return {
          removedBuildings,
          updatedBuilding: building,
        };
      }
    }
  };

  private move = (index: number, newIndex: number): ModificationResult => {
    const { queue } = this._village.buildings;
    const isGoingDown = index < newIndex;
    const indexCorrection = isGoingDown ? 1 : -1;
    const movedBuilding = queue.buildings()[index];
    const currentBuildingAtNewIndex = queue.buildings()[newIndex + indexCorrection];

    let removedBuildings: QueuedBuilding[] = [];
    let updatedBuildings: QueuedBuilding[] = [];

    if (currentBuildingAtNewIndex?.fieldId !== movedBuilding.fieldId) {
      //  undefined means moving 1 up/down when on the edge. That means it wouldnt be possible to merge anyway
      queue.moveTo(index, newIndex);
    } else {
      if (isGoingDown) {
        currentBuildingAtNewIndex.startingLevel = movedBuilding.startingLevel;
      } else {
        currentBuildingAtNewIndex.targetLevel = movedBuilding.targetLevel;
      }

      updatedBuildings.push(currentBuildingAtNewIndex);
      removedBuildings.push(movedBuilding);
      queue.remove(movedBuilding.id);
    }

    return {
      updatedBuildings,
      removedBuildings,
    };
  };

  public moveAsHighAsPossible = async (queueId: string): Promise<ModificationResult> => {
    const offsets = new Offsets();
    const { queue } = this._village.buildings;
    const queuedBuildings = queue.buildings();

    const movedBuilding = queuedBuildings.find((b) => b.id === queueId);

    if (!movedBuilding) {
      return {
        updatedBuildings: [],
        removedBuildings: [],
      };
    }

    const queueIndex = this._village.buildings.queue
      .buildings()
      .findIndex((b) => b.id === queueId);

    if (queueIndex === 0) {
      return {
        updatedBuildings: [],
        removedBuildings: [],
      };
    }

    let newIndex: number | undefined;

    for (let i = 0; i < queueIndex; i++) {
      if (this.willQueuedBuildingStillMeetItsRequirements({
        checkedBuilding: movedBuilding,
        offsets,
      })) {
        newIndex = i;
        break;
      }

      const qBuilding = queuedBuildings[i];
      const increment = qBuilding.targetLevel - qBuilding.startingLevel + 1;

      offsets.increaseFor(qBuilding.fieldId, increment);
    }

    if (newIndex === undefined) {
      return {
        updatedBuildings: [],
        removedBuildings: [],
      };
    }

    const result = this.move(queueIndex, newIndex);

    this.onUpdate();

    return result;
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

  public canMoveBuildingToIndex = (
    queueId: string,
    targetQueueId: string,
  ): boolean => {
    const newIndex = this._village.buildings.queue.buildings().findIndex(b => b.id === targetQueueId);
    const flags = this._canMoveToIndexFlags.get(queueId);
    const flag = flags && flags.get(newIndex);

    if (flag !== undefined) {
      return flag;
    }

    const buildings = this._village.buildings.queue.buildings();
    const currentIndex = buildings.findIndex((b) => b.id === queueId);

    if (currentIndex === newIndex) {
      this.updateCanMoveToIndexFlags(queueId, newIndex, false);
      return false;
    }

    const isGoingDown = currentIndex < newIndex;

    if (isGoingDown) {
      // if going down then recalculate for every building on the way
      const offsets = new Offsets();

      for (const [i, qBuilding] of buildings.entries()) {
        if (qBuilding.id === queueId) {
          continue;
        }

        if (
          isGoingDown &&
          !this.willQueuedBuildingStillMeetItsRequirements({
            checkedBuilding: qBuilding,
            offsets,
          })
        ) {
          this.updateCanMoveToIndexFlags(queueId, newIndex, false);
          return false;
        }

        if (i === newIndex) {
          break;
        }

        const increment = qBuilding.targetLevel - qBuilding.startingLevel + 1;
        offsets.increaseFor(qBuilding.fieldId, increment);
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

      const increment = qBuilding.targetLevel - qBuilding.startingLevel + 1;
      offsets.increaseFor(qBuilding.fieldId, increment);
    }

    const building = buildings[currentIndex];
    const result = this.willQueuedBuildingStillMeetItsRequirements({
      checkedBuilding: building,
      offsets,
    });
    this.updateCanMoveToIndexFlags(queueId, newIndex, result);
    return result;
  };

  public moveBuildingToIndex = async (queueId: string, targetQueueId: string): Promise<ModificationResult> => {
    const { queue } = this._village.buildings;
    const currentIndex = this._village.buildings.queue
      .buildings()
      .findIndex((b) => b.id === queueId);

    if (!this.canMoveBuildingToIndex(queueId, targetQueueId)) {
      return {
        removedBuildings: [],
        updatedBuildings: [],
      };
    }

    const newIndex = queue.buildings().findIndex(b => b.id === targetQueueId);

    const result = this.move(currentIndex, newIndex);

    this.onUpdate();

    return result;
  };

  public clearQueue = (): BuildingQueue => {
    const { queue } = this._village.buildings;

    if (queue.buildings().length) {
      queue.clear();
      this.onUpdate();
    }

    return queue;
  };

  public willQueuedBuildingStillMeetItsRequirements = ({
    checkedBuilding,
    offsets = new Offsets(),
    ignoreOngoing = false,
  }: WillMeetRequirementsParams): boolean => {
    const buildingSpots = this._village.buildings.spots.buildings();

    const getNewTotalLevel = (building: BuildingSpot): number =>
      (ignoreOngoing ? building.level.actual : building.level.getActualAndOngoing()) + offsets.getFor(building.fieldId);

    const { conditions, maxLevel } = buildingInfoService.getBuildingInfo(checkedBuilding.type);

    //  should have parent, lvl1 also has a parent: with lvl 0
    const hasParent = buildingSpots.some(
      (s) =>
        s.fieldId === checkedBuilding.fieldId &&
        getNewTotalLevel(s) === checkedBuilding.startingLevel - 1,
    );

    if (!hasParent) {
      return false;
    }

    if (checkedBuilding.type <= BuildingType.Crop) {
      return true;
    }

    if (checkedBuilding.startingLevel === 1) {
      //  unique buildings test.. if it has same type on another field it should be maxed at least somewhere
      const buildingsOfTheType = buildingSpots.filter((b) => b.type === checkedBuilding.type);
      const anyCompleted = buildingsOfTheType.some((b) => getNewTotalLevel(b) >= maxLevel);

      //  if none is completed but other of the same type exist then we cant move it
      if (!anyCompleted && buildingsOfTheType.length > 1) {
        return false;
      }

      for (let i = 0; i < conditions.requiredBuildings.length; i++) {
        const requiredBuilding = conditions.requiredBuildings[i];
        const requiredBuildingExists = buildingSpots.some(
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
    queueIdsToBeRemoved: ReadonlySet<string> = new Set<string>(),
  ): ReadonlySet<string> => {
    const offsets = new Offsets();
    const buildings = this._village.buildings.queue.buildings();
    const idsToRemove = new Set<string>();

    for (const qBuilding of buildings) {
      if (queueIdsToBeRemoved.has(qBuilding.id)) {
        idsToRemove.add(qBuilding.id);
      } else {
        const shouldBeRemoved = this.shouldRemoveBuildingFromQueue(qBuilding, offsets);

        if (shouldBeRemoved) {
          idsToRemove.add(qBuilding.id);
        } else {
          const increment = qBuilding.targetLevel - qBuilding.startingLevel + 1;

          offsets.increaseFor(qBuilding.fieldId, increment);
        }
      }
    }

    return idsToRemove;
  };

  public getMainBuildingLevels = (): ReadonlyMap<string, number> => {
    const { spots, queue } = this._village.buildings;
    const mainBuilding = spots.ofType(BuildingType.MainBuilding);
    let baseMbLevel = mainBuilding
      ? mainBuilding.level.getActualAndOngoing()
      : 0;

    return queue.buildings().reduce((reduced, building) => {
      const { id } = building;
      const baseMbLevelForThisBuilding = baseMbLevel;

      if (building.type === BuildingType.MainBuilding) {
        const increment = building.targetLevel - building.startingLevel + 1;
        baseMbLevel += increment;
      }

      reduced.set(id, baseMbLevelForThisBuilding);

      return reduced;
    }, new Map<string, number>());
  };

  private shouldRemoveBuildingFromQueue = (
    queuedBuilding: QueuedBuilding,
    providedOffsets: Offsets,
  ): boolean => {
    if (
      queuedBuilding.type === BuildingType.Palace &&
      AccountContext.getContext()
        .villageService.allVillages()
        .some(
          (otherVillage) =>
            otherVillage.id !== this._village.id &&
            AccountContext.getContext()
              .villageService.village(otherVillage.id)
              .buildings.spots.buildings()
              .some((b) => b.type === BuildingType.Palace),
        )
    ) {
      // iba 1 palac
      return true;
    }

    const buildingSpots = this._village.buildings.spots.buildings();

    // if buildings lvl >= 2, the building with previous level should exist on the same field
    if (queuedBuilding.startingLevel >= 2) {
      const previousLevelBuildingExists = buildingSpots.some(
        (b) =>
          b.type === queuedBuilding.type &&
          b.fieldId === queuedBuilding.fieldId &&
          b.level.getActualAndOngoing() +
            providedOffsets.getFor(queuedBuilding.fieldId) + 1
            === queuedBuilding.startingLevel,
      );

      if (!previousLevelBuildingExists) {
        return true;
      }

      return false;
    }

    // Check that no building is present on the field
    if (buildingSpots.some(b => b.fieldId === queuedBuilding.fieldId
      && b.level.getActualAndOngoing() > 0)) {
      return true;
    }

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

    const prohibitedBuildingExists = buildingSpots.some(
      (b) =>
        b.level.getActualAndOngoing() + providedOffsets.getFor(b.fieldId) > 0 &&
        conditions.prohibitedBuildingTypes.includes(b.type),
    );

    if (prohibitedBuildingExists) {
      return true;
    }

    if (queuedBuilding.type > BuildingType.Crop) {
      // u resource je jedno
      const sameTypeBuildings = buildingSpots.filter(
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
      const requiredBuildingExists = buildingSpots.some(
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

  private onUpdate = async (hasChanges: boolean | undefined = undefined): Promise<void> => {
    if (hasChanges === false) {
      return;
    }

    this._village.buildings.updateSpotsQueuedState();
    this._canMoveToIndexFlags.clear();
    this._canMoveBlockToIndexFlags.clear();
    await this.serializeQueue();
  };
}
