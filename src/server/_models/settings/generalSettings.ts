import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';

export class GeneralSettings {
  public readonly allowTasks: boolean = true;
  public readonly autoBuild: boolean = true;
  public readonly autoParty: boolean = true;
  public readonly autoStart: boolean = false;
  public readonly autoUnits: boolean = true;

  constructor(params: PartialFields<GeneralSettings> = {}) {
    mergeDefaults(this, params);
  }
}