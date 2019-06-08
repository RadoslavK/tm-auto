import { QueuedBuilding } from './queuedBuilding';

export class BuildingQueue {
  private _buildings: QueuedBuilding[] = [];

  public enqueue(building: QueuedBuilding) {
    this._buildings.push(building);
  }

  public dequeue(): QueuedBuilding | undefined {
    return this._buildings.shift();
  }

  public dequeueAt(index: number): QueuedBuilding | undefined {
    const building = this._buildings[index];

    if (building) {
      this.removeAt(index);
    }

    return building;
  }

  public removeAt(index: number) {
    delete this._buildings[index];
  }

  public clear(): void {
    this._buildings = [];
  }

  public buildings(): readonly QueuedBuilding[] {
    return this._buildings;
  }

  public moveUp(index: number) {
    if (this._buildings.length <= 1) {
      return;
    }

    const newIndex = index - 1;

    if (newIndex < 0) {
      return;
    }

    this.move(index, newIndex);
  }

  public moveDown(index: number) {
    if (this._buildings.length === 0) {
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
