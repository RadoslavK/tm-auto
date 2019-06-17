import { BuildingSpotType, getBuildingSpotType } from '../../../_enums/BuildingSpotType';
import { QueuedBuilding } from './queuedBuilding';

export class BuildingQueue {
  private _buildings: QueuedBuilding[] = [];

  public add = (building: QueuedBuilding):  void => {
    this._buildings.push(building);
  };

  public peek = (type: BuildingSpotType): QueuedBuilding | undefined => {
    return type === BuildingSpotType.Any
      ? this._buildings[0]
      : this._buildings.find(x => getBuildingSpotType(x.type) === type);
  };

  public removeLastAtField = (fieldId: number): number => {
    const buildingToRemove = this._buildings.slice().reverse().find(b => b.fieldId === fieldId);

    if (buildingToRemove) {
      this.remove(buildingToRemove.queueId);
      return 1;
    }

    return 0;
  };

  public removeAllAtField = (fieldId: number): number => {
    const originalCount = this._buildings.length;
    this._buildings = this._buildings.filter(b => b.fieldId !== fieldId);

    return originalCount - this._buildings.length;
  };

  public remove = (queueId: string): number => {
    const originalCount = this._buildings.length;
    this._buildings = this._buildings.filter(b => b.queueId !== queueId);

    return originalCount - this._buildings.length;
  };

  public clear = (): void => {
    this._buildings = [];
  };

  public buildings = (): readonly QueuedBuilding[] => this._buildings;

  public moveUp = (queueId: string): void => {
    if (this._buildings.length <= 1) {
      return;
    }

    const index = this._buildings.findIndex(b => b.queueId === queueId);

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
    if (this._buildings.length <= 1) {
      return;
    }

    const index = this._buildings.findIndex(b => b.queueId === queueId);

    if (index === -1) {
      return;
    }

    const newIndex = index + 1;

    if (newIndex >= this._buildings.length) {
      return;
    }

    this.move(index, newIndex);
  };

  public pushToTheStart = (qBuilding: QueuedBuilding): void => {
    this.remove(qBuilding.queueId);
    this._buildings.splice(0, 0, qBuilding);
  };

  private move = (oldIndex: number, newIndex: number): void => {
    this._buildings.splice(newIndex, 0, this._buildings.splice(oldIndex, 1)[0])
  };
}
