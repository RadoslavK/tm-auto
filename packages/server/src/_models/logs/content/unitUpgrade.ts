import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class UnitUpgradeLogEntryContent {
  public readonly unitIndex: number = 0;
  public readonly level: number = 0;

  constructor(params: PartialFields<UnitUpgradeLogEntryContent> = {}) {
    mergeDefaults(this, params);
  }
}
