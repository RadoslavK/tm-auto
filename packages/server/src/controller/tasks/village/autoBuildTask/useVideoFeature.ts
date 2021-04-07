import { AccountContext } from '../../../../accountContext.js';
import { getPage } from '../../../../browser/getPage.js';

export const useVideoFeature = async (): Promise<boolean> => {
  const page = await getPage();

  const upgradeBtn = await page.$('.green.build.videoFeatureButton');

  if (!upgradeBtn) {
    console.error('Did not find video feature button, reverting to normal build');

    return false;
  }

  AccountContext.getContext().logsService.logText('Watching video to speed up auto build.');

  await Promise.all([
    page.waitForSelector('.dialog.videoFeature'),
    upgradeBtn.click(),
  ]);

  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

  return true;
};