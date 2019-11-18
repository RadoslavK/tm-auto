import { Tribe } from '../../_enums/Tribe';
import { getPage } from '../../browser/getPage';
import { logException } from '../../../../_shared/utils/logException';

export const parseTribe = async (): Promise<Tribe> => {
  const page = await getPage();
  const className = await page.$eval('[class*=tribe]', e => e.className);
  const match = /tribe(\d+)/.exec(className);

  if (!match) {
    throw logException('Failed to parse tribe');
  }

  return +match[1];
};
