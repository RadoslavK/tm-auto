import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { completeTaskIds } from '../../constants/completeTaskIds';

type CompleteTasksSettings = {
  readonly allow: boolean;

  readonly allowedTaskIds: readonly string[];
};

export class AutoMentorSettings {
  public readonly acceptTaskRewards: boolean = true;

  public readonly acceptDailyRewards: boolean = true;

  public readonly completeTasks: CompleteTasksSettings = {
    allow: false,
    allowedTaskIds: completeTaskIds,
  };

  constructor(params: PartialFields<AutoMentorSettings> = {}) {
    mergeDefaults(this, params);
  }
}
