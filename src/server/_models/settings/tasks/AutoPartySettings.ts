import { PartyType } from '../../../_enums/PartyType';
import { ITaskSettingsParams } from '../../../_types/ITaskSettingsParams';
import { CoolDown } from '../../coolDown';
import { Fields } from '../../../../_shared/types';
import { merge } from '../../../../_shared/merge';

export interface IAutoPartySettingsParams extends ITaskSettingsParams {
  readonly minCulturePoints: number;
  readonly partyType: PartyType;
}

const defaults: Fields<AutoPartySettings> = {
  allow: false,
  minCulturePoints: 0,
  coolDown: new CoolDown(),
  partyType: PartyType.Small,
};

export class AutoPartySettings implements IAutoPartySettingsParams {
  allow: boolean;
  coolDown: CoolDown;

  minCulturePoints: number;
  partyType: PartyType;

  constructor(params: Partial<IAutoPartySettingsParams> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
    }));
  }
}
