import {
  BuildingSpotType,
  getBuildingSpotType,
} from '../../../_enums/buildingSpotType.js';
import type { QueuedBuilding } from './queuedBuilding.js';

export class BuildingQueue {
  private _buildings: QueuedBuilding[] = [];

  public set = (buildings: QueuedBuilding[]): void => {
    this._buildings = buildings;
  };

  public add = (building: QueuedBuilding): void => {
    this._buildings.push(building);
  };

  public peek = (type: BuildingSpotType): QueuedBuilding | undefined =>
    type === BuildingSpotType.Any
      ? this._buildings[0]
      : this._buildings.find((x) => getBuildingSpotType(x.type) === type);

  public getAllAtField = (
    fieldId: number,
    predicate: (building: QueuedBuilding) => boolean,
  ): readonly QueuedBuilding[] =>
    this.buildings().filter((b) => b.fieldId === fieldId && predicate(b));

  public getLastAtField = (fieldId: number): QueuedBuilding | undefined =>
    this._buildings
      .slice()
      .reverse()
      .find((b) => b.fieldId === fieldId);

  public remove = (queueId: string): number => this.removeBulk([queueId]);

  public removeBulk = (queueIds: string[]): number => {
    const originalCount = this._buildings.length;
    this._buildings = this._buildings.filter(
      (b) => !queueIds.includes(b.queueId),
    );

    return originalCount - this._buildings.length;
  };

  public clear = (): void => {
    this._buildings = [];
  };

  public buildings = (): readonly QueuedBuilding[] => this._buildings;

  public moveTo = (oldIndex: number, newIndex: number): void => {
    this._buildings.splice(newIndex, 0, this._buildings.splice(oldIndex, 1)[0]);
  };

  public moveBlockTo = (
    oldStartIndex: number,
    count: number,
    newIndex: number,
  ): void => {
    this._buildings.splice(
      newIndex,
      0,
      ...this._buildings.splice(oldStartIndex, count),
    );
  };
}
