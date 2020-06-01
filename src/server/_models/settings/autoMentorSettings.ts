import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';

export class AutoMentorSettings {
  public readonly acceptRewards: boolean = true;
  public readonly completeTasks: boolean = false;

  constructor(params: PartialFields<AutoMentorSettings> = {}) {
    mergeDefaults(this, params);
  }
}