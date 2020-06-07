import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';

export class AutoMentorSettings {
  public readonly acceptTaskRewards: boolean = true;
  public readonly acceptDailyRewards: boolean = true;

  constructor(params: PartialFields<AutoMentorSettings> = {}) {
    mergeDefaults(this, params);
  }
}