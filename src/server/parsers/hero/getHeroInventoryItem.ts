import { ElementHandle } from 'puppeteer-core';

import { TravianPath } from '../../_enums/travianPath';
import { getPage } from '../../browser/getPage';
import { validateUrl } from '../../utils/validateUrl';

type Result = {
  readonly amount: number;
  readonly node: ElementHandle | null;
};

export const getHeroInventoryItem = async (id: number): Promise<Result> => {
  await validateUrl([TravianPath.Hero], true);

  const page = await getPage();

  const itemNode = await page.$(`#itemsToSale .item[class*="item_${id}"]`);

  const amount = itemNode
    ? await itemNode.$eval('.amount', (x) => +(<HTMLElement>x).innerText)
    : 0;

  return {
    amount,
    node: itemNode,
  };
};
