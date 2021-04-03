import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class AutoMentorSettings {
  public readonly acceptTaskRewards: boolean = true;

  public readonly acceptDailyRewards: boolean = true;

  constructor(params: PartialFields<AutoMentorSettings> = {}) {
    mergeDefaults(this, params);
  }
}
