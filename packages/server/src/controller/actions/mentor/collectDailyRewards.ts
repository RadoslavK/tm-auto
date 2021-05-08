import { AccountContext } from '../../../accountContext.js';
import { browserManager } from '../../../browser/browserManager.js';
import { activityService } from '../../../services/botActivityService.js';

export const collectDailyRewards = async (): Promise<void> => {
  if (!AccountContext.getContext().settingsService.autoMentor.get().acceptDailyRewards) {
    return;
  }

  const page = await browserManager.getPage();

  const dailyRewards = await page.$('#navigation .dailyQuests');

  if (!dailyRewards) {
    throw new Error('Did not find daily rewards button');
  }

  activityService.setActivity('Claiming daily reward');

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

  await Promise.all([
    claimRewardButton.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);
};