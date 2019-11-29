import {
  IAutoPartySettings,
  IPartyType,
} from '../../../_types/graphql';
import { merge } from '../../../../_shared/merge';
import { Fields } from '../../../../_shared/types';
import { CoolDown } from '../../coolDown';
import { Duration } from '../../duration';

const getDefaults = (): Fields<AutoPartySettings> => ({
  allow: false,
  minCulturePoints: 0,
  coolDown: new CoolDown({
    min: new Duration({ minutes: 30 }),
    max: new Duration({ minutes: 55 }),
  }),
  partyType: IPartyType.Small,
});

export class AutoPartySettings implements IAutoPartySettings {
  public allow: boolean;
  public coolDown: CoolDown;

  public minCulturePoints: number;
  public partyType: IPartyType;

  constructor(params: Partial<IAutoPartySettings> = {}) {
    Object.assign(this, merge(getDefaults, {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
    }));
  }
}
