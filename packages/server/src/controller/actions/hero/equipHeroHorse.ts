import { TravianPath } from '../../../_enums/travianPath.js';
import { getPage } from '../../../browser/getPage.js';
import { heroItemIds } from '../../../constants/heroItemIds.js';
import { getHeroInventoryItem } from '../../../parsers/hero/getHeroInventoryItem.js';
import { activityService } from '../../../services/botActivityService.js';
import { ensurePage } from '../ensurePage.js';

export const equipHeroHorse = async () => {
  await ensurePage(TravianPath.Hero, true);

  const { node: horseItem } = await getHeroInventoryItem(heroItemIds.horse);

  if (!horseItem) {
    throw new Error('Did not find horse item while equipping');
  }

  const page = await getPage();

  await Promise.all([
    horseItem.click(),
    page.waitForSelector(`#horse [class*="item_${heroItemIds.horse}"].onHero`),
  ]);

  const { amount } = await getHeroInventoryItem(heroItemIds.horse);

  if (amount) {
    throw new Error('Did not equip the horse');
  }

  activityService.setActivity('Equipped hero horse.');
};
