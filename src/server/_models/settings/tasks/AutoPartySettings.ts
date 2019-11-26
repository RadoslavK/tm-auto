import { CoolDown } from '../../coolDown';
import { Fields } from '../../../../_shared/types';
import { merge } from '../../../../_shared/merge';
import {
  IAutoPartySettings,
  IPartyType,
} from '../../../_types/graphql';

const defaults: Fields<AutoPartySettings> = {
  allow: false,
  minCulturePoints: 0,
  coolDown: new CoolDown(),
  partyType: IPartyType.Small,
};

export class AutoPartySettings implements IAutoPartySettings {
  public allow: boolean;
  public coolDown: CoolDown;

  public minCulturePoints: number;
  public partyType: IPartyType;

  constructor(params: Partial<IAutoPartySettings> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
    }));
  }
}
