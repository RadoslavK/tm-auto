import type { ElementHandle } from 'puppeteer-core';

import { TravianPath } from '../../_enums/travianPath.js';
import { browserManager } from '../../browser/browserManager.js';
import { validateUrl } from '../../utils/validateUrl.js';

type Result = {
  readonly amount: number;
  readonly node: ElementHandle | null;
};

export const getHeroInventoryItem = async (id: number): Promise<Result> => {
  await validateUrl([TravianPath.Hero], true);

  const page = await browserManager.getPage();

  const itemNode = await page.$(`#itemsToSale .item[class*="item_${id}"]`);

  const amount = itemNode
    ? await itemNode.$eval('.amount', (x) => +(<HTMLElement>x).innerText)
    : 0;

  return {
    amount,
    node: itemNode,
  };
};
