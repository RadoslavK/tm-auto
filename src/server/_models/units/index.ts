import { BuildingType } from '../../../_shared/types/buildingType';
import { UnitsQueue } from './unitsQueue';

export class Units {
  private _counts: Map<number, number> = new Map();

  public barracksQueue: UnitsQueue = new UnitsQueue();
  public stableQueue: UnitsQueue = new UnitsQueue();
  public workshopQueue: UnitsQueue = new UnitsQueue();
  public residenceQueue: UnitsQueue = new UnitsQueue();

  public setQueue = (type: BuildingType, queue: UnitsQueue): void => {
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

      default:
        throw new Error(`Invalid building for queue, type: ${BuildingType[type]}`);
    }
  };

  public resetCounts = (): void => {
    this._counts.clear();
  };

  public addCount = (unitIndex: number, amount: number): void => {
    const count = this._counts.get(unitIndex);
    this._counts.set(unitIndex, count ? count + amount : amount);
  };

  public getCount = (unitIndex: number): number => this._counts.get(unitIndex) || 0;
}
