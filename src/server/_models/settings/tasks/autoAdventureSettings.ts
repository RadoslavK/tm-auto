import {
  AdventureCriteria,
  IAutoAdventureSettings,
} from '../../../_types/graphql';
import { merge } from '../../../../_shared/merge';
import { Fields } from '../../../../_shared/types';
import { CoolDown } from '../../coolDown';
import { Duration } from '../../duration';

const getDefaults = (): Fields<AutoAdventureSettings> => ({
  adventureCriteria: AdventureCriteria.Closest,
  allow: true,

  coolDown: new CoolDown({
    max: new Duration({ minutes: 13 }),
    min: new Duration({ minutes: 8 }),
  }),
  hardMinHealth: 50,
  maxTravelTime: new Duration({ hours: 1 }),
  normalMinHealth: 30,
  preferHard: false,
  preferredVillageId: null,
});

export class AutoAdventureSettings implements IAutoAdventureSettings {
  public allow: boolean;
  public coolDown: CoolDown;

  public adventureCriteria: AdventureCriteria;
  public preferHard: boolean;
  public normalMinHealth: number;
  public hardMinHealth: number;
  public maxTravelTime: Duration;
  public preferredVillageId: number | null;

  constructor(params: Partial<IAutoAdventureSettings> = {}) {
    Object.assign(this, merge(getDefaults, {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
      maxTravelTime: params.maxTravelTime && new Duration(params.maxTravelTime),
    }));
  }
}
