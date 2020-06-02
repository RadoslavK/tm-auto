import { AutoMentorSettings } from '../../_models/settings/autoMentorSettings';
import { TaskType } from '../../../_shared/types/taskType';
import { getAccountContext } from '../../accountContext';
import { acceptTaskReward } from '../actions/mentor/acceptTaskReward';
import { updateMentorTasks } from '../actions/mentor/updateMentorTasks';
import { BotTask } from '../taskEngine/botTaskEngine';

export class AutoMentorTask implements BotTask {
  private settings = (): AutoMentorSettings => getAccountContext().settingsService.autoMentor.get();

  public allowExecution = (): boolean => {
    const { acceptRewards } = this.settings();

    return acceptRewards;
  };

  public execute = async (): Promise<void> => {
    const { acceptRewards } = this.settings();

    let hadAutomatedTasks: boolean;

    do {
      hadAutomatedTasks = false;

      await updateMentorTasks();

      for (const task of getAccountContext().mentorTasks) {
        if (acceptRewards && task.completed) {
          await acceptTaskReward(task);

          hadAutomatedTasks = true;
        }
      }
    } while (hadAutomatedTasks);
  };

  readonly type: TaskType = TaskType.AutoMentor;
}