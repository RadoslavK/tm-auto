import { BuildingType } from '../../_enums/buildingType';
import { UnitsQueue } from './unitsQueue';

export class Units {
  private readonly m_counts: Record<number, number> = {};

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

  public setCount = (unitIndex: number, amount: number): void => {
    this.m_counts[unitIndex] = amount;
  };

  public getCount = (unitIndex: number): number => this.m_counts[unitIndex] || 0;
}
