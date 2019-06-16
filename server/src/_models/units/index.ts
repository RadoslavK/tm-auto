import { BuildingType } from '../../_enums/BuildingType';
import { UnitsQueue } from './unitsQueue';

export class Units {
  private readonly _counts: Record<number, number> = {};

  public barracksQueue: UnitsQueue = new UnitsQueue();
  public stableQueue: UnitsQueue = new UnitsQueue();
  public workshopQueue: UnitsQueue = new UnitsQueue();
  public residenceQueue: UnitsQueue = new UnitsQueue();

  public setQueue = (type: BuildingType, queue: UnitsQueue) => {
    switch (type) {
      case BuildingType.Barracks:
        this.barracksQueue = queue;
        break;

      case BuildingType.Stable:
        this.stableQueue = queue;
        break;

      case BuildingType.Workshop:
        this.workshopQueue = queue;
        break;

      case BuildingType.Residence:
      case BuildingType.Palace:
        this.residenceQueue = queue;
        break;
    }
  };

  public setCount = (unitIndex: number, amount: number) => this._counts[unitIndex] = amount;

  public getCount = (unitIndex: number): number => this._counts[unitIndex] || 0;
}
