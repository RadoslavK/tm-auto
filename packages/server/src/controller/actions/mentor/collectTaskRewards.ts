import { getAccountContext } from 'server/accountContext.js';
import { getPage } from 'server/browser/getPage.js';

export const collectTaskRewards = async (): Promise<void> => {
  const page = await getPage();

  const questMasterNode = await page.$('#questmasterButton');

  if (!questMasterNode) {
    throw new Error('Did not find quest master');
  }

  do {
    const hasRewards = await questMasterNode.$('.bigSpeechBubble');

    if (!hasRewards) {
      break;
    }

    await Promise.all([
      questMasterNode.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    const tasksToCollect = await page.$$("#tasks .achieved");

    for (const task of tasksToCollect) {
      const collectButton = await task.$('button.green');

      if (!collectButton) {
        throw new Error('Did not find collect button');
      }

      const title = await task.$eval('[class=title]', x => x.textContent);

      if (!title) {
        throw new Error('Did not find collectible task title');
      }

      getAccountContext().logsService.logText(`Collecting rewards for task: ${title}`);

      await Promise.all([
        collectButton.click(),
        page.waitForXPath(`//*[@id="tasks"]//*[@class="title" and text()="${title}"]`, { hidden: true }),
      ]);
    }
  } while (true);
};