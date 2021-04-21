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

  public insertAfter = (newBuilding: QueuedBuilding, target: QueuedBuilding): boolean => {
    const index = this._buildings.indexOf(target);

    if (index === -1) {
      return false;
    }

    this._buildings.splice(index + 1, 0, newBuilding);

    return true;
  };

  public peek = (type: BuildingSpotType): QueuedBuilding | undefined =>
    type === BuildingSpotType.Any
      ? this._buildings[0]
      : this._buildings.find((x) => getBuildingSpotType(x.type) === type);

  public peekNextBuilding = (building: QueuedBuilding): QueuedBuilding | undefined => {
    const index = this._buildings.indexOf(building);

    return this._buildings[index + 1];
  }

  public peekLast = (): QueuedBuilding | undefined => this._buildings.length
    ? this._buildings[this._buildings.length - 1]
    : undefined;

  public getAllAtField = (
    fieldId: number,
    predicate: (building: QueuedBuilding) => boolean,
  ): readonly QueuedBuilding[] =>
    this.buildings().filter((b) => b.fieldId === fieldId && predicate(b));

  public getLastAtField = (
    fieldId: number,
    predicate?: (building: QueuedBuilding) => boolean,
  ): QueuedBuilding | undefined =>
    this._buildings
      .slice()
      .reverse()
      .find((b) => b.fieldId === fieldId && (!predicate || predicate(b)));

  public remove = (queueId: string): ReadonlyArray<QueuedBuilding> => this.removeBulk(new Set<string>([queueId]));

  public removeBulk = (queueIds: ReadonlySet<string>): ReadonlyArray<QueuedBuilding> => {
    const removedBuildings: QueuedBuilding[] = [];

    for (let i = this._buildings.length - 1; i >= 0; i--) {
      const building = this._buildings[i];

      if (queueIds.has(building.id)) {
        removedBuildings.push(building);
        this._buildings.splice(i, 1);
      }
    }

    return removedBuildings;
  };

  public clear = (): void => {
    this._buildings = [];
  };

  public buildings = (): readonly QueuedBuilding[] => this._buildings;

  public moveTo = (oldIndex: number, newIndex: number): void => {
    this._buildings.splice(newIndex, 0, this._buildings.splice(oldIndex, 1)[0]);
  };
}
