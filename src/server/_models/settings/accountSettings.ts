import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { CoolDown } from '../coolDown';
import { Duration } from '../duration';

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