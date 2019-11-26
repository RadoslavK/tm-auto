import { QueuedUnit } from './queuedUnit';
import { Duration } from '../duration';

export class UnitsQueue {
  public duration = new Duration();

  private readonly m_units: Record<number, QueuedUnit> = {};

  public units = (): readonly QueuedUnit[] => Object.values(this.m_units);

  public add = (index: number, amount: number): void => {
    let queuedUnit: QueuedUnit = this.m_units[index];

    if (!queuedUnit) {
      queuedUnit = new QueuedUnit({ index, amount });
      this.m_units[index] = queuedUnit;
    }

    queuedUnit.amount += amount;
  };

  public getQueuedCount = (index: number): number => this.m_units[index].amount;
}
