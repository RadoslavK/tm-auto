import { CoolDown } from '../../coolDown';
import {
  Duration,
} from '../../duration';
import { merge } from '../../../../_shared/merge';
import {
  IAdventureCriteria,
  IAutoAdventureSettings,
} from '../../../_types/graphql';
import { Fields } from '../../../../_shared/types';

const defaults: Fields<AutoAdventureSettings> = {
  allow: true,
  coolDown: new CoolDown(),

  adventureCriteria: IAdventureCriteria.Closest,
  preferHard: false,
  normalMinHealth: 30,
  hardMinHealth: 50,
  maxTravelTime: new Duration({ hours: 1 }),
  preferredVillageId: null,
};

export class AutoAdventureSettings implements IAutoAdventureSettings {
  public allow: boolean;
  public coolDown: CoolDown;

  public adventureCriteria: IAdventureCriteria;
  public preferHard: boolean;
  public normalMinHealth: number;
  public hardMinHealth: number;
  public maxTravelTime: Duration;
  public preferredVillageId: number | null;

  constructor(params: Partial<IAutoAdventureSettings> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
      maxTravelTime: params.maxTravelTime && new Duration(params.maxTravelTime),
    }));
  }
}
