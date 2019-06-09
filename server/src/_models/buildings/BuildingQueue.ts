import { QueuedBuilding } from './queuedBuilding';

export class BuildingQueue {
  private _buildings: QueuedBuilding[] = [];

  public add(building: QueuedBuilding) {
    this._buildings.push(building);
  }

  public popFirst(): QueuedBuilding | undefined {
    return this._buildings.shift();
  }

  public popLastAtField(fieldId: number): void {
    const buildingToRemove = this._buildings.slice().reverse().find(b => b.fieldId === fieldId);

    if (buildingToRemove) {
      this.remove(buildingToRemove.queueId);
    }
  }

  public remove = (queueId: string) => {
    this._buildings = this._buildings.filter(b => b.queueId !== queueId);
  };

  public clear(): void {
    this._buildings = [];
  }

  public buildings(): readonly QueuedBuilding[] {
    return this._buildings;
  }

  public moveUp(queueId: string) {
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
  }

  public moveDown(queueId: string) {
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
  }

  private move(oldIndex: number, newIndex: number) {
    this._buildings.splice(newIndex, 0, this._buildings.splice(oldIndex, 1)[0])
  }
}
