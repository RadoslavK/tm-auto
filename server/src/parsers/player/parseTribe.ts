import { Tribe } from '../../_enums/Tribe';
import { getPage } from '../../browser/getPage';

export const parseTribe = async (): Promise<Tribe> => {
  const page = await getPage();
  const className = await page.$eval('[class*=tribe]', e => e.className);
  const match = /tribe(\d+)/.exec(className);

  return +match[1];
};
