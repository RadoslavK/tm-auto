import { ITaskSettings } from '../../../_types/ITaskSettings';
import { getSeconds } from '../../../utils/getSeconds';
import { CoolDown } from '../../coolDown';

export enum AdventureCriteria {
  Closest,
  Furthest,
  Random,
  FirstToExpire,
}

interface IParams extends ITaskSettings {
  adventureCriteria: AdventureCriteria;
  preferHard: boolean;
  normalMinHealth: number;
  hardMinHealth: number;
  maxTravelTime: number;
  preferredVillageId: number | null;
}

export class AutoAdventureSettings implements IParams {
  public allow = true;
  public coolDown: CoolDown = new CoolDown();

  adventureCriteria: AdventureCriteria = AdventureCriteria.Closest;
  preferHard = false;
  normalMinHealth = 30;
  hardMinHealth = 50;
  maxTravelTime: number = getSeconds({ hours: 1 });
  preferredVillageId: number | null = null;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);

    if (this.coolDown instanceof CoolDown) {
      return;
    }

    this.coolDown = new CoolDown(this.coolDown);
  }
}
