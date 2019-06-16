import { ITaskSettings } from '../../../_types/ITaskSettings';
import { getSeconds } from '../../../utils/getSeconds';
import { Cooldown } from '../../cooldown';

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
  preferredVillageId?: number;
}

export class AutoAdventureSettings implements IParams {
  public allow: boolean = true;
  public coolDown: Cooldown = new Cooldown();

  adventureCriteria: AdventureCriteria = AdventureCriteria.Closest;
  preferHard: boolean = false;
  normalMinHealth: number = 30;
  hardMinHealth: number = 50;
  maxTravelTime: number = getSeconds({ hours: 1 });
  preferredVillageId?: number = undefined;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);

    if (this.coolDown instanceof Cooldown) {
      return;
    }

    this.coolDown = new Cooldown(this.coolDown);
  }
}
