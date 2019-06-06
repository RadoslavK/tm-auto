import { QueuedBuilding } from '../_models/buildings/queuedBuilding';
import { IBuilding, IDequeueBuildingInput, IEnqueueBuildingInput, IQueuedBuilding } from '../_types/graphql';

export class BuildingsService {
  private readonly _buildings: Record<string, readonly IBuilding[]> = {};
  private readonly _buildingQueue: Record<string, IQueuedBuilding[]> = {};

  public getVillageBuildings(villageId: string): readonly IBuilding[] {
    return this._buildings[villageId];
  }

  public setVillageBuildings(villageId: string, buildings: readonly IBuilding[]) {
    this._buildings[villageId] = buildings;
  }

  public getVillageBuildingQueue(villageId: string): readonly IQueuedBuilding[] {
    return this._buildingQueue[villageId] || [];
  }

  public enqueueBuilding(input: IEnqueueBuildingInput): void {
    const {
      buildingType,
      fieldId,
      villageId,
    } = input;

    const buildings = this._buildingQueue[villageId];
    const building: IQueuedBuilding = new QueuedBuilding({
      fieldId,
      buildingType,
    });

    if (buildings) {
      buildings.push(building);
    } else {
      this._buildingQueue[villageId] = [building];
    }
  }

  public dequeueBuilding(input: IDequeueBuildingInput): void {
    const {
      fieldId,
      villageId,
    } = input;

    const buildings = this._buildingQueue[villageId];
    buildings.filter(building => building.fieldId === fieldId);
  }
}
