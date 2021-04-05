import type { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding.js';
import { VillageServiceBase } from '../villageServiceBase.js';
import type { SerializeQueue } from './types/serializeQueue.type.js';

type Result = {
  readonly removedBuilding?: QueuedBuilding;
  readonly updatedBuilding?: QueuedBuilding;
};

export class MergeBuildingsService extends VillageServiceBase {
  constructor(villageId: string, private serializeQueue: SerializeQueue) {
    super(villageId);
  }

  public mergeBuildings = (topQueueId: string): Result => {
    const { queue } = this.village.buildings;

    const topBuildingIndex = queue.buildings().findIndex(b => b.id === topQueueId);
    const lowBuildingIndex = topBuildingIndex + 1;

    const topBuilding = queue.buildings()[topBuildingIndex];
    const lowBuilding = queue.buildings()[lowBuildingIndex];

    if (!topBuilding
    || !lowBuilding
    || topBuilding.fieldId !== lowBuilding.fieldId) {
      return {};
    }

    lowBuilding.startingLevel = topBuilding.startingLevel;

    queue.remove(topQueueId);
    this.serializeQueue(true);

    return {
      removedBuilding: topBuilding,
      updatedBuilding: lowBuilding,
    };
  };
}