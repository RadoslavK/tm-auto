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

  // Wait a bit
  await page.waitForTimeout(3 * 1000);

  // trigger watching video if it was not started due to "ad block"
  const watchVideoBtn = await page.$('.green[onclick*=showVideo]');
  await watchVideoBtn?.click();

  //  The ad can be more than the default 30s
  await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60 * 1000 });

  return true;
};