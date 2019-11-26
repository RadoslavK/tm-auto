import { Duration } from '../duration';

export class UnitsQueue {
  public duration = new Duration();

  private readonly m_amountsByIndex: Record<number, number> = {};

  public add = (unitIndex: number, amount: number): void => {
    const queuedAmount: number | undefined = this.m_amountsByIndex[unitIndex];

    if (queuedAmount) {
      this.m_amountsByIndex[unitIndex] = queuedAmount + amount;
    } else {
      this.m_amountsByIndex[unitIndex] = amount;
    }
  };

  public getQueuedCount = (unitIndex: number): number => this.m_amountsByIndex[unitIndex] || 0;
}
