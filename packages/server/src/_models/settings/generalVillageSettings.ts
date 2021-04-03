import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class GeneralVillageSettings {
  public readonly allowTasks: boolean = true;

  constructor(params: PartialFields<GeneralVillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}
