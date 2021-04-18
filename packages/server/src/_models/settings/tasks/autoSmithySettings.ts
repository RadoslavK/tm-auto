import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { CoolDown } from '../../coolDown.js';
import { Duration } from '../../duration.js';

export type AutoSmithyUnitLevelSettings = {
  readonly targetLevel: number;
  readonly minTroops: number;
};

export type AutoSmithyUnitSettings = {
  readonly unitIndex: number;
  readonly levels: ReadonlyArray<AutoSmithyUnitLevelSettings>;
};

export class AutoSmithySettings {
  public readonly allow: boolean = false;
  public readonly useHeroResources: boolean = false;

  public readonly coolDown: CoolDown = new CoolDown({
    min: new Duration({ minutes: 20 }),
    max: new Duration({ minutes: 30 }),
  });

  public readonly units: ReadonlyArray<AutoSmithyUnitSettings> = [];

  constructor(params: PartialFields<AutoSmithySettings> = {}) {
    mergeDefaults(this, params);
  }
}