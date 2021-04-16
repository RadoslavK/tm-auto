import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { CoolDown } from '../../coolDown.js';
import { Duration } from '../../duration.js';

export class AutoAcademySettings {
  public readonly allow: boolean = false;
  public readonly useHeroResources: boolean = false;

  public readonly coolDown: CoolDown = new CoolDown({
    min: new Duration({ minutes: 20 }),
    max: new Duration({ minutes: 30 }),
  });

  public readonly units: ReadonlyArray<number> = [];

  constructor(params: PartialFields<AutoAcademySettings> = {}) {
    mergeDefaults(this, params);
  }
}