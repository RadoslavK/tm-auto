import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { CoolDown } from '../../coolDown.js';
import { Duration } from '../../duration.js';

export class AutoPartySettings {
  public readonly useHeroResources: boolean = false;

  public readonly allowSmall: boolean = false;

  public readonly allowLarge: boolean = false;

  public readonly coolDown: CoolDown = new CoolDown({
    max: new Duration({ minutes: 35 }),
    min: new Duration({ minutes: 22 }),
  });

  public readonly minCulturePointsSmall: number = 0;

  public readonly minCulturePointsLarge: number = 0;

  constructor(params: PartialFields<AutoPartySettings> = {}) {
    mergeDefaults(this, params);
  }
}
