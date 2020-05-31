import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';

export class AutoMentorSettings {
  public readonly allow: boolean = true;
  public readonly disabledRewardIds: readonly string[] = [];
  // TODO: make usage of this in auto build
  public readonly reserveResourceRewardsForOtherTasks: boolean = true;

  constructor(params: PartialFields<AutoMentorSettings> = {}) {
    mergeDefaults(this, params);
  }
}