import { Duration } from '../duration';

export class UnitsQueue {
  public duration = new Duration();

  private readonly _amountsByIndex: Record<number, number> = {};

  public add = (unitIndex: number, amount: number): void => {
    const queuedAmount: number | undefined = this._amountsByIndex[unitIndex];

    if (queuedAmount) {
      this._amountsByIndex[unitIndex] = queuedAmount + amount;
    } else {
      this._amountsByIndex[unitIndex] = amount;
    }
  };

  public getQueuedCount = (unitIndex: number): number =>
    this._amountsByIndex[unitIndex] || 0;
}
