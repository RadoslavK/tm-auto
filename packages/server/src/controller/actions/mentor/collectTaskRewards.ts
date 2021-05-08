import { AccountContext } from '../../../accountContext.js';
import { browserManager } from '../../../browser/browserManager.js';
import { activityService } from '../../../services/botActivityService.js';

export const collectTaskRewards = async (): Promise<void> => {
  if (!AccountContext.getContext().settingsService.autoMentor.get().acceptTaskRewards) {
    return;
  }

  const page = await browserManager.getPage();

  do {
    const questMasterNode = await page.$('#questmasterButton');

    if (!questMasterNode) {
      throw new Error('Did not find quest master');
    }

    const hasRewards = await questMasterNode.$('.bigSpeechBubble');

    if (!hasRewards) {
      break;
    }

    await Promise.all([
      page.waitForSelector('#tasks'),
      questMasterNode.click(),
    ]);

    let tasksToCollect = await page.$$("#tasks .achieved");

    if (!tasksToCollect.length) {
      //  Collect from general tab
      await Promise.all([
        page.click('#tasks .content:nth-child(2) .tabItem'),
        page.waitForSelector('#tasks .achieved'),
      ]);

      tasksToCollect = await page.$$("#tasks .achieved");
    }

    for (const task of tasksToCollect) {
      const collectButton = await task.$('button.green');

      if (!collectButton) {
        throw new Error('Did not find collect button');
      }

      const title = await task.$eval('[class=title]', x => x.textContent);

      if (!title) {
        throw new Error('Did not find collectible task title');
      }

      activityService.setActivity(`Collecting rewards for task: ${title}`);

      await Promise.all([
        collectButton.click(),
        page.waitForXPath(`//*[@id="tasks"]//*[.//*[@class="title" and text()="${title}"] and .//*[contains(@class, "green")]]`, { hidden: true }),
      ]);
    }
  } while (true);
};