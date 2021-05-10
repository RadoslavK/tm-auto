import { browserManager } from '../browserManager.js';
import { parseGold } from '../parsers/parseGold.js';

export const ensureBonusProduction = async (): Promise<void> => {
  const gold = await parseGold();

  if (gold <= 110) {
    return;
  }

  const page = await browserManager.getPage();

  await page.click('.shop');

  const tab = await page.waitForSelector('[data-tabname="pros"]');

  await Promise.all([
    page.waitForSelector('.featureCollectionWrapper'),
    tab.click(),
  ]);

  const ensureRes = async (res: string): Promise<void> => {
    const button = await page.$(`.productionboost${res}:not(.active) .prosButton`);

    if (button) {
      await Promise.all([
        page.waitForSelector(`.productionboost${res}:not(.active) .prosButton`, { hidden: true }),
        button.click(),
      ]);
    }
  };

  await ensureRes('Wood');
  await ensureRes('Clay');
  await ensureRes('Iron');
  await ensureRes('Crop');
};