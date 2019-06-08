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
}
