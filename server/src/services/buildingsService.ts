import { BuildingSpot } from '../_models/buildings/buildingSpot';
import { BuildingInProgress } from '../_models/buildings/buildingInProgress';
import { QueuedBuilding } from '../_models/buildings/queuedBuilding';
import { IDequeueBuildingInput, IEnqueueBuildingInput } from '../_types/graphql';

export class BuildingsService {
  private readonly _buildingSpots: Record<number, readonly BuildingSpot[]> = {};
  private readonly _buildingsInProgress: Record<number, BuildingInProgress[]> = {};
  private readonly _queuedBuildings: Record<number, QueuedBuilding[]> = {};

  public getBuildingSpots(villageId: number): readonly BuildingSpot[] {
    return this._buildingSpots[villageId];
  }

  public setBuildingSpots(villageId: number, buildings: Iterable<BuildingSpot>) {
    this._buildingSpots[villageId] = [...buildings];
  }

  public getBuildingQueue(villageId: number): readonly QueuedBuilding[] {
    return this._queuedBuildings[villageId] || [];
  }

  public getBuildingsInProgress(villageId: number): readonly BuildingInProgress[] {
    return this._buildingsInProgress[villageId] || [];
  }

  public setBuildingsInProgress(villageId: number, buildings: Iterable<BuildingInProgress>): void {
    this._buildingsInProgress[villageId] = [...buildings];
  }

  public clearQueue(villageId: number): void {
    const buildings = this._queuedBuildings[villageId];

    if (buildings) {
      delete this._queuedBuildings[villageId];
    }
  }

  public enqueueBuilding(input: IEnqueueBuildingInput): void {
    const {
      type,
      fieldId,
      villageId,
    } = input;

    const buildings = this._queuedBuildings[villageId];
    const building: QueuedBuilding = new QueuedBuilding({
      fieldId,
      type,
    });

    if (buildings) {
      buildings.push(building);
    } else {
      this._queuedBuildings[villageId] = [building];
    }
  }

  public dequeueBuilding(input: IDequeueBuildingInput): void {
    const {
      queueIndex,
      villageId,
    } = input;

    const buildings = this._queuedBuildings[villageId];
    delete buildings[queueIndex];
  }
}
