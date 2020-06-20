import { AutoMentorSettings } from '../../_models/settings/autoMentorSettings';
import { TaskType } from '../../_types/graphql.type';
import { getAccountContext } from '../../accountContext';
import { getPage } from '../../browser/getPage';
import { acceptTaskReward } from '../actions/mentor/acceptTaskReward';
import { updateMentorTasks } from '../actions/mentor/updateMentorTasks';
import { BotTask } from '../taskEngine/botTaskEngine';

export class AutoMentorTask implements BotTask {
  private settings = (): AutoMentorSettings =>
    getAccountContext().settingsService.autoMentor.get();

  public allowExecution = (): boolean => {
    const { acceptDailyRewards, acceptTaskRewards } = this.settings();

    return acceptDailyRewards || acceptTaskRewards;
  };

  public execute = async (): Promise<void> => {
    const { acceptDailyRewards, acceptTaskRewards } = this.settings();

    if (acceptTaskRewards) {
      await this.acceptTaskRewards();
    }
    if (acceptDailyRewards) {
      await this.acceptDailyRewards();
    }
  };

  public acceptDailyRewards = async (): Promise<void> => {
    const page = await getPage();

    const dailyRewards = await page.$('#navigation .dailyQuests');

    if (!dailyRewards) {
      throw new Error('Did not find daily rewards button');
    }

    const acceptableDailyRewards = await dailyRewards.$('.indicator');

    if (!acceptableDailyRewards) {
      return;
    }

    await Promise.all([
      acceptableDailyRewards.click(),
      page.waitForSelector('#achievementQuestList'),
    ]);

    const bubbleElements = await page.$$('.rewardReady');

    if (bubbleElements.length > 1) {
      throw new Error(
        'Encountered 2 or more daily rewards tasks to complete. Implement the action properly',
      );
    }

    await bubbleElements[0].click();

    const claimRewardButton = await page.waitForSelector(
      '[type="submit"].green.questButtonGainReward',
    );

    if (!claimRewardButton) {
      throw new Error('Did not find claim reward button');
    }

    getAccountContext().logsService.logText('Claiming daily reward');

    await Promise.all([
      claimRewardButton.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  };

  public acceptTaskRewards = async (): Promise<void> => {
    let hadAutomatedTasks: boolean;

    do {
      hadAutomatedTasks = false;

      await updateMentorTasks();

      for (const task of getAccountContext().mentorTasks) {
        if (!task.completed) {
          continue;
        }

        await acceptTaskReward(task);
        hadAutomatedTasks = true;
      }
    } while (hadAutomatedTasks);
  };

  readonly type: TaskType = TaskType.AutoMentor;
}
