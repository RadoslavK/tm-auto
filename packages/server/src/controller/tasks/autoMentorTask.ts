import { TaskType } from '../../_models/misc/taskType.js';
import type { AutoMentorSettings } from '../../_models/settings/autoMentorSettings.js';
import { AccountContext } from '../../accountContext.js';
import { getPage } from '../../browser/getPage.js';
import { collectTaskRewards } from '../actions/mentor/collectTaskRewards.js';
import type { BotTask } from '../taskEngine/botTaskEngine.js';

export class AutoMentorTask implements BotTask {
  private settings = (): AutoMentorSettings =>
    AccountContext.getContext().settingsService.autoMentor.get();

  public allowExecution = (): boolean => {
    const {
      acceptDailyRewards,
      acceptTaskRewards,
    } = this.settings();

    return acceptDailyRewards || acceptTaskRewards;
  };

  public execute = async (): Promise<void> => {
    await this.acceptTaskRewards();
    await this.acceptDailyRewards();
  };

  private acceptDailyRewards = async (): Promise<void> => {
    if (!this.settings().acceptDailyRewards) {
      return;
    }

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

    AccountContext.getContext().logsService.logText('Claiming daily reward');

    await Promise.all([
      claimRewardButton.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  };

  private acceptTaskRewards = async (): Promise<void> => {
    const { acceptTaskRewards } = this.settings();

    if (!acceptTaskRewards) {
      return;
    }

    await collectTaskRewards();
  };

  readonly type: TaskType = TaskType.AutoMentor;
}
