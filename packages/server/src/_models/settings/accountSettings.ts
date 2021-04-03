import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { CoolDown } from '../coolDown.js';
import { Duration } from '../duration.js';

export class AccountSettings {
  public readonly allowTasks: boolean = true;

  public readonly tasksCoolDown: CoolDown = new CoolDown({
    min: new Duration({ seconds: 10 }),
    max: new Duration({ seconds: 35 }),
  });

  public readonly autoBuild: boolean = true;

  public readonly autoParty: boolean = true;

  public readonly autoStart: boolean = false;

  public readonly autoUnits: boolean = true;

  constructor(params: PartialFields<AccountSettings> = {}) {
    mergeDefaults(this, params);
  }
}
