import { buildingInfos } from '../../../index';
import { Cost } from '../../misc/cost';
import { QueuedBuilding } from './queuedBuilding';

export class BuildingQueue {
  private _buildings: QueuedBuilding[] = [];

  public add = (building: QueuedBuilding):  void => {
    this._buildings.push(building);
  };

  public popFirst = (): QueuedBuilding | undefined => this._buildings.shift();

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

  public totalCost = (): Cost =>
    this._buildings.reduce((reduced, building) => {
      const cost = buildingInfos[building.fieldId][building.level - 1].cost;
      reduced.add(cost);
      return reduced;
    }, new Cost());

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

  private move = (oldIndex: number, newIndex: number): void => {
    this._buildings.splice(newIndex, 0, this._buildings.splice(oldIndex, 1)[0])
  };
}
