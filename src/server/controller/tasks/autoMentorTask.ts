import { AutoMentorSettings } from '../../_models/settings/autoMentorSettings';
import { TaskType } from '../../../_shared/types/taskType';
import { accountContext } from '../../accountContext';
import { acceptTaskReward } from '../actions/mentor/acceptTaskReward';
import { completableTaskActions } from '../actions/mentor/completableTaskActions';
import { updateMentorTasks } from '../actions/mentor/updateMentorTasks';
import { BotTask } from '../taskEngine/botTaskEngine';

export class AutoMentorTask implements BotTask {
  private settings = (): AutoMentorSettings => accountContext.settingsService.autoMentor.get();

  public allowExecution = (): boolean => {
    const { acceptRewards, completeTasks } = this.settings();

    return acceptRewards || completeTasks;
  };

  public execute = async (): Promise<void> => {
    const {
      acceptRewards,
      completeTasks,
    } = this.settings();

    let hadAutomatedTasks = false;

    do {
      await updateMentorTasks();

      for (const task of accountContext.mentorTasks) {
        if (acceptRewards && task.completed) {
          await acceptTaskReward(task);

          hadAutomatedTasks = true;
        } else if (completeTasks) {
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