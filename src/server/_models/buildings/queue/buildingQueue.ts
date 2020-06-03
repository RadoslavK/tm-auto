import {
  BuildingSpotType,
  getBuildingSpotType,
} from '../../../_enums/buildingSpotType';
import { QueuedBuilding } from './queuedBuilding';

export class BuildingQueue {
  private _buildings: QueuedBuilding[] = [];

  public set = (buildings: QueuedBuilding[]): void => {
    this._buildings = buildings;
  };

  public add = (building: QueuedBuilding): void => {
    this._buildings.push(building);
  };

  public peek = (type: BuildingSpotType): QueuedBuilding | undefined => type === BuildingSpotType.Any
    ? this._buildings[0]
    : this._buildings.find(x => getBuildingSpotType(x.type) === type);

  public peekLast = (): QueuedBuilding | undefined => this._buildings.length
    ? this._buildings[this._buildings.length - 1]
    : undefined;

  public getPrevious = (queueId: string): QueuedBuilding | undefined => {
    const index = this._buildings.findIndex(b => b.queueId === queueId);

    if (index <= 0) {
      return;
    }

    return this._buildings[index - 1];
  };

  public getFollowing = (queueId: string): QueuedBuilding | undefined => {
    const index = this._buildings.findIndex(b => b.queueId === queueId);

    if (index === -1 || index >= (this._buildings.length - 1)) {
      return;
    }

    return this._buildings[index + 1];
  };

  public getAllAtField = (fieldId: number): readonly QueuedBuilding[] =>
    this.buildings().filter(b => b.fieldId === fieldId);

  public getLastAtField = (fieldId: number): QueuedBuilding | undefined =>
    this._buildings.slice().reverse().find(b => b.fieldId === fieldId);

  public remove = (queueId: string): number =>
    this.removeBulk([queueId]);

  public removeBulk = (queueIds: string[]): number => {
    const originalCount = this._buildings.length;
    this._buildings = this._buildings.filter(b => !queueIds.includes(b.queueId));

    return originalCount - this._buildings.length;
  };

  public clear = (): void => {
    this._buildings = [];
  };

  public buildings = (): readonly QueuedBuilding[] => this._buildings;

  public moveUp = (queueId: string): boolean => {
    if (this._buildings.length <= 1) {
      return false;
    }

    const index = this._buildings.findIndex(b => b.queueId === queueId);

    if (index === -1) {
      return false;
    }

    const building = this._buildings[index];

    if (!building.canMoveUp) {
      return false;
    }

    const newIndex = index - 1;

    if (newIndex < 0) {
      return false;
    }

    this.swap(index, newIndex);

    return true;
  };

  public moveDown = (queueId: string): boolean => {
    if (this._buildings.length <= 1) {
      return false;
    }

    const index = this._buildings.findIndex(b => b.queueId === queueId);

    if (index === -1) {
      return false;
    }

    const building = this._buildings[index];

    if (!building.canMoveDown) {
      return false;
    }

    const newIndex = index + 1;

    if (newIndex >= this._buildings.length) {
      return false;
    }

    this.swap(index, newIndex);

    return true;
  };

  public swap = (oldIndex: number, newIndex: number): void => {
    this._buildings.splice(newIndex, 0, this._buildings.splice(oldIndex, 1)[0]);
  };
}
