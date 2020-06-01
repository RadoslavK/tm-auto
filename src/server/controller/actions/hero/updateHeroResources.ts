import { TravianPath } from '../../../_enums/travianPath';
import { Resources } from '../../../_models/misc/resources';
import { accountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import { ensurePage } from '../ensurePage';

const itemIds = {
  wood: 145,
  clay: 146,
  iron: 147,
  crop: 148,
};

export const updateHeroResources = async (): Promise<void> => {
  const page = await getPage();

  await ensurePage(TravianPath.Hero, true);

  const getResource = async (id: number): Promise<number> => {
    const itemNode = await page.$(`#itemsToSale .item[class*="item_${id}"]`);

    return itemNode
      ? itemNode.$eval('.amount', x => +(<HTMLElement>x).innerText)
      : 0;
  };

  const wood = await getResource(itemIds.wood);
  const clay = await getResource(itemIds.clay);
  const iron = await getResource(itemIds.iron);
  const crop = await getResource(itemIds.crop);

  accountContext.hero.resources = new Resources({ wood, clay, iron, crop });
};