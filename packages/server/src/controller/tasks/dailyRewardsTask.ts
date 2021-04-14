import { TaskType } from 'shared/enums/TaskType.js';

import { AccountContext } from '../../accountContext.js';
import { getPage } from '../../browser/getPage.js';
import type { BotTask } from '../taskEngine/botTaskEngine.js';

export class DailyRewardsTask implements BotTask {
  private acceptDailyRewards = () =>
    AccountContext.getContext().settingsService.autoMentor.get().acceptDailyRewards;

  public allowExecution = (): boolean => this.acceptDailyRewards();

  public execute = async (): Promise<void> => {
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
  }

  readonly type: TaskType = TaskType.AutoMentor;
}