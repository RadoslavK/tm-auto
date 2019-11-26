import { ITaskSettingsParams } from '../../../_types/ITaskSettingsParams';
import { CoolDown } from '../../coolDown';
import {
  Duration,
  IDurationParams,
} from '../../duration';
import { merge } from '../../../../_shared/merge';

export enum AdventureCriteria {
  Closest,
  Furthest,
  Random,
  FirstToExpire,
}

export interface IAutoAdventureSettingsParams extends ITaskSettingsParams {
  readonly adventureCriteria: AdventureCriteria;
  readonly preferHard: boolean;
  readonly normalMinHealth: number;
  readonly hardMinHealth: number;
  readonly maxTravelTime: IDurationParams;
  readonly preferredVillageId: number | null;
}

const defaults: AutoAdventureSettings = {
  allow: true,
  coolDown: new CoolDown(),

  adventureCriteria: AdventureCriteria.Closest,
  preferHard: false,
  normalMinHealth: 30,
  hardMinHealth: 50,
  maxTravelTime: new Duration({ hours: 1 }),
  preferredVillageId: null,
};

export class AutoAdventureSettings implements IAutoAdventureSettingsParams {
  public allow: boolean;
  public coolDown: CoolDown;

  adventureCriteria: AdventureCriteria;
  preferHard: boolean;
  normalMinHealth: number;
  hardMinHealth: number;
  maxTravelTime: Duration;
  preferredVillageId: number | null;

  constructor(params: Partial<IAutoAdventureSettingsParams> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
      maxTravelTime: params.maxTravelTime && new Duration(params.maxTravelTime),
    }));
  }
}
