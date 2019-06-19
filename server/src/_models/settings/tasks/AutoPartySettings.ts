import { PartyType } from '../../../_enums/PartyType';
import { ITaskSettings } from '../../../_types/ITaskSettings';
import { CoolDown } from '../../coolDown';

interface IParams extends ITaskSettings {
  minCulturePoints: number;
  partyType: PartyType;
}

export class AutoPartySettings implements IParams {
  allow: boolean = false;
  coolDown: CoolDown = new CoolDown();

  minCulturePoints: number = 0;
  partyType: PartyType = PartyType.Small;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
