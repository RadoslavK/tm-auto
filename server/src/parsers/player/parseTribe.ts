import { Page } from 'puppeteer';
import { Tribe } from '../../_enums/Tribe';

export const parseTribe = async (page: Page): Promise<Tribe> => {
  const className = await page.$eval('[class*=tribe]', e => e.className);
  const match = /tribe(\d+)/.exec(className);

  return +match[1];
};
