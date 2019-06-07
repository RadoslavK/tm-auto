import { BuildingQueue } from '../_models/buildings/BuildingQueue';
import { BuildingSpot } from '../_models/buildings/buildingSpot';
import { BuildingInProgress } from '../_models/buildings/buildingInProgress';
import { QueuedBuilding } from '../_models/buildings/queuedBuilding';
import { IDequeueBuildingInput, IEnqueueBuildingInput } from '../_types/graphql';

export class BuildingsService {
  private readonly _buildingSpots: Record<number, readonly BuildingSpot[]> = {};
  private readonly _buildingsInProgress: Record<number, BuildingInProgress[]> = {};
  private readonly _buildingQueues: Record<number, BuildingQueue> = {};

  public getBuildingSpots(villageId: number): readonly BuildingSpot[] {
    return this._buildingSpots[villageId] || [];
  }

  public setBuildingSpots(villageId: number, buildings: Iterable<BuildingSpot>) {
    this._buildingSpots[villageId] = [...buildings];
  }

  public getBuildingQueue(villageId: number): BuildingQueue {
    let queue = this._buildingQueues[villageId];

    if (!queue) {
      queue = new BuildingQueue();
      this._buildingQueues[villageId] = queue;
    }

    return queue;
  }

  public getBuildingsInProgress(villageId: number): readonly BuildingInProgress[] {
    return this._buildingsInProgress[villageId] || [];
  }

  public setBuildingsInProgress(villageId: number, buildings: Iterable<BuildingInProgress>): void {
    this._buildingsInProgress[villageId] = [...buildings];
  }

  public clearQueue(villageId: number): void {
    const queue = this.getBuildingQueue(villageId);
    queue.clear();
  }

  public enqueueBuilding(input: IEnqueueBuildingInput): void {
    const {
      type,
      fieldId,
      villageId,
    } = input;

    const buildings = this.getBuildingSpots(villageId);
    const queue = this.getBuildingQueue(villageId);
    const queued = queue.buildings().filter(b => b.fieldId === fieldId).length;
    const level = buildings[fieldId - 1].level + queued + 1;

    const building: QueuedBuilding = new QueuedBuilding({
      fieldId,
      level,
      type,
    });


    queue.enqueue(building);
  }

  public dequeueBuilding(input: IDequeueBuildingInput): void {
    const {
      queueIndex,
      villageId,
    } = input;

    const queue = this.getBuildingQueue(villageId);
    queue.dequeueAt(queueIndex);
  }
}
