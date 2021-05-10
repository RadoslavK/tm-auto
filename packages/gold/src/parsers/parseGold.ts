import { browserManager } from '../browserManager.js';

export const parseGold = async (): Promise<number> => {
  const page = await browserManager.getPage();

  const gold = await page.$eval('.ajaxReplaceableGoldAmount', x => /(.*?)/.exec(x.textContent ?? '')?.[1]);

  if (!gold) {
    throw new Error('Failed to parse gold amount');
  }

  return +gold;
};