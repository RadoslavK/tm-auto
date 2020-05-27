import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';

export class GeneralVillageSettings {
  public readonly allowTasks: boolean = true;

  constructor(params: PartialFields<GeneralVillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}