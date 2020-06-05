import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';
import { CoolDown } from '../../coolDown';
import { Duration } from '../../duration';

export class AutoPartySettings {
  public readonly allowSmall: boolean = false;
  public readonly allowLarge: boolean = false;

  public readonly coolDown: CoolDown = new CoolDown({
    max: new Duration({ minutes: 55 }),
    min: new Duration({ minutes: 30 }),
  });

  public readonly minCulturePointsSmall: number = 0;
  public readonly minCulturePointsLarge: number = 0;

  constructor(params: PartialFields<AutoPartySettings> = {}) {
    mergeDefaults(this, params);
  }
}