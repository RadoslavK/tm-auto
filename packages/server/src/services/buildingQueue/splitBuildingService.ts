import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding.js';
import { VillageServiceBase } from '../villageServiceBase.js';
import type { SerializeQueue } from './types/serializeQueue.type.js';

type Result = {
  readonly addedBuilding?: QueuedBuilding;
  readonly updatedBuilding?: QueuedBuilding;
};

export class SplitBuildingService extends VillageServiceBase {
  constructor(villageId: string, private serializeQueue: SerializeQueue) {
    super(villageId);
  }

  public splitBuilding = (queueId: string, startingLevel: number): Result => {
    const { queue } = this.village.buildings;

    const building = queue.buildings().find(b => b.id === queueId);

    if (!building
      || building.startingLevel === building.targetLevel
      || startingLevel <= building.startingLevel
      || startingLevel > building.targetLevel) {
      return {};
    }

    const addedBuilding = new QueuedBuilding({
      ...building,
      id: QueuedBuilding.createId(),
      startingLevel,
      targetLevel: building.targetLevel,
    });

    const added = queue.insertAfter(addedBuilding, building);

    if (!added) {
      return {};
    }

    building.targetLevel = startingLevel - 1;

    this.serializeQueue(true);

    return {
      addedBuilding,
      updatedBuilding: building,
    };
  };
}