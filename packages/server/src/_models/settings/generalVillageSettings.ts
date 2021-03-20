import { mergeDefaults } from 'shared/utils/merge.js';
import type { PartialFields } from 'shared/types/fields.type.js';

export class GeneralVillageSettings {
  public readonly allowTasks: boolean = true;

  constructor(params: PartialFields<GeneralVillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}
