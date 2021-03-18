import { mergeDefaults } from '../../../../_shared/merge.js';
import { PartialFields } from '../../../../_shared/types/fields.type.js';
import { completeTaskIds } from '../../constants/completeTaskIds.js';

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
