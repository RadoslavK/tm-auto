import { getPage } from '../../../../browser/getPage.js';
import { activityService } from '../../../../services/botActivityService.js';

export const useVideoFeature = async (): Promise<boolean> => {
  activityService.setActivity('Watching video to speed up auto build.');
  const page = await getPage();

  const upgradeBtn = await page.$('.green.build.videoFeatureButton');

  if (!upgradeBtn) {
    console.error('Did not find video feature button, reverting to normal build');

    return false;
  }

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

  //  Maybe it  shown the modal pop up
  const checkbox = await page.$('#dontShowThisAgain');

  if (checkbox) {
    await checkbox.click();

    const submitBtn = await page.$('.dialog form .ok.green');

    if (!submitBtn) {
      throw new Error('Did not find submit button for hiding of video construction use');
    }

    await Promise.all([
      page.waitForSelector('#dontShowThisAgain', { hidden: true }),
      submitBtn.click(),
    ]);
  }

  return true;
};