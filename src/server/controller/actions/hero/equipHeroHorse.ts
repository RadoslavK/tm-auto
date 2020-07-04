import { TravianPath } from '../../../_enums/travianPath';
import { getAccountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import { heroItemIds } from '../../../constants/heroItemIds';
import { getHeroInventoryItem } from '../../../parsers/hero/getHeroInventoryItem';
import { ensurePage } from '../ensurePage';

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

  getAccountContext().logsService.logText('Equipped hero horse.');
};
