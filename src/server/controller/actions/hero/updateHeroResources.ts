import { TravianPath } from '../../../_enums/travianPath';
import { Resources } from '../../../_models/misc/resources';
import { getAccountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import { heroItemIds } from '../../../constants/heroItemIds';
import { ensurePage } from '../ensurePage';

export const updateHeroResources = async (): Promise<void> => {
  const page = await getPage();

  await ensurePage(TravianPath.Hero, true);

  const getResource = async (id: number): Promise<number> => {
    const itemNode = await page.$(`#itemsToSale .item[class*="item_${id}"]`);

    return itemNode
      ? itemNode.$eval('.amount', x => +(<HTMLElement>x).innerText)
      : 0;
  };

  const wood = await getResource(heroItemIds.wood);
  const clay = await getResource(heroItemIds.clay);
  const iron = await getResource(heroItemIds.iron);
  const crop = await getResource(heroItemIds.crop);

  getAccountContext().hero.resources = new Resources({ wood, clay, iron, crop });
};