import {
  BuildingSpotType,
  getBuildingSpotType,
} from '../../../_enums/buildingSpotType';
import { QueuedBuilding } from './queuedBuilding';

export class BuildingQueue {
  private m_buildings: QueuedBuilding[] = [];

  public set = (buildings: QueuedBuilding[]): void => {
    this.m_buildings = buildings;
  };

  public add = (building: QueuedBuilding): void => {
    this.m_buildings.push(building);
  };

  public peek = (type: BuildingSpotType): QueuedBuilding | undefined => type === BuildingSpotType.Any
    ? this.m_buildings[0]
    : this.m_buildings.find(x => getBuildingSpotType(x.type) === type);

  public removeLastAtField = (fieldId: number): number => {
    const buildingToRemove = this.m_buildings.slice().reverse().find(b => b.fieldId === fieldId);

    if (buildingToRemove) {
      this.remove(buildingToRemove.queueId);
      return 1;
    }

    return 0;
  };

  public removeAllAtField = (fieldId: number): number => {
    const originalCount = this.m_buildings.length;
    this.m_buildings = this.m_buildings.filter(b => b.fieldId !== fieldId);

    return originalCount - this.m_buildings.length;
  };

  public remove = (queueId: string): number => {
    const originalCount = this.m_buildings.length;
    this.m_buildings = this.m_buildings.filter(b => b.queueId !== queueId);

    return originalCount - this.m_buildings.length;
  };

  public clear = (): void => {
    this.m_buildings = [];
  };

  public buildings = (): readonly QueuedBuilding[] => this.m_buildings;

  public moveUp = (queueId: string): void => {
    if (this.m_buildings.length <= 1) {
      return;
    }

    const index = this.m_buildings.findIndex(b => b.queueId === queueId);

    if (index === -1) {
      return;
    }

    const newIndex = index - 1;

    if (newIndex < 0) {
      return;
    }

    this.move(index, newIndex);
  };

  public moveDown = (queueId: string): void => {
    if (this.m_buildings.length <= 1) {
      return;
    }

    const index = this.m_buildings.findIndex(b => b.queueId === queueId);

    if (index === -1) {
      return;
    }

    const newIndex = index + 1;

    if (newIndex >= this.m_buildings.length) {
      return;
    }

    this.move(index, newIndex);
  };

  public move = (oldIndex: number, newIndex: number): void => {
    this.m_buildings.splice(newIndex, 0, this.m_buildings.splice(oldIndex, 1)[0]);
  };
}
