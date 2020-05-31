import { MentorTask } from '../../_models/mentor/mentorTask';
import { AutoMentorSettings } from '../../_models/settings/autoMentorSettings';
import { TaskType } from '../../../_shared/types/taskType';
import { accountContext } from '../../accountContext';
import { resourceMentorTaskRewards } from '../../constants/resourceMentorTaskRewards';
import { acceptTaskReward } from '../actions/mentor/acceptTaskReward';
import { completableTaskActions } from '../actions/mentor/completableTaskActions';
import { updateMentorTasks } from '../actions/mentor/updateMentorTasks';
import { BotTask } from '../taskEngine/botTaskEngine';

export class AutoMentorTask implements BotTask {
  private settings = (): AutoMentorSettings => accountContext.settingsService.autoMentor.get();

  public allowExecution = (): boolean => this.settings().allow;

  private canAcceptTaskReward = (task: MentorTask): boolean => {
    const {
      disabledRewardIds,
      reserveResourceRewardsForOtherTasks,
    } = this.settings();

    return task.completed
      && !disabledRewardIds.includes(task.id)
      && (!resourceMentorTaskRewards.get(task.id)
        || !reserveResourceRewardsForOtherTasks);
  };

  public execute = async (): Promise<void> => {
    let hadAutomatedTasks = false;

    do {
      await updateMentorTasks();

      for (const task of accountContext.mentorTasks) {
        if (this.canAcceptTaskReward(task)) {
          await acceptTaskReward(task);

          hadAutomatedTasks = true;
        } else {
          const completeAction = completableTaskActions.get(task.id);

          if (completeAction) {
            await completeAction();

            hadAutomatedTasks = true;
          }
        }
      }
    } while (hadAutomatedTasks);
  };

  readonly type: TaskType = TaskType.AutoMentor;
}