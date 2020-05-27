import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';
import { PartyType } from '../../../../_shared/types/partyType';
import { CoolDown } from '../../coolDown';
import { Duration } from '../../duration';

export class AutoPartySettings {
  public readonly allow: boolean = false;

  public readonly coolDown: CoolDown = new CoolDown({
    max: new Duration({ minutes: 55 }),
    min: new Duration({ minutes: 30 }),
  });

  public readonly minCulturePoints: number = 0;
  public readonly partyType: PartyType = PartyType.Small;

  constructor(params: PartialFields<AutoPartySettings> = {}) {
    mergeDefaults(this, params);
  }
}