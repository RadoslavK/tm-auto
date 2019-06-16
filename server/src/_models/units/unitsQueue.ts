import { QueuedUnit } from './queuedUnit';

export class UnitsQueue {
  public duration: number = 0;

  private readonly _units: Record<number, QueuedUnit> = {};

  public units = (): readonly QueuedUnit[] => Object.values(this._units);

  public add = (index: number, amount: number): void => {
    let queuedUnit: QueuedUnit = this._units[index];

    if (!queuedUnit) {
      queuedUnit = new QueuedUnit({ index, amount });
      this._units[index] = queuedUnit;
    }

    queuedUnit.amount += amount;
  };

  public getQueuedCount = (index: number): number => this._units[index].amount;
}
