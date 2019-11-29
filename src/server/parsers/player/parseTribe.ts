import { Tribe } from '../../../_shared/types/tribe';
import { getPage } from '../../browser/getPage';

export const parseTribe = async (): Promise<Tribe> => {
  const page = await getPage();
  const className = await page.$eval('[class*=tribe]', e => e.className);
  const match = /tribe(\d+)/.exec(className);

  if (!match) {
    throw new Error('Failed to parse tribe');
  }

  const tribeIndex = +match[1];

  if (tribeIndex < Tribe.Romans || tribeIndex > Tribe.Huns) {
    throw new Error(`Unknown tribe index: ${tribeIndex}`);
  }

  return tribeIndex as Tribe;
};
