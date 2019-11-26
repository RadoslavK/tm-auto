import { getPage } from '../../browser/getPage';
import { ITribe } from '../../_types/graphql';
import { getTribeFromIndex } from '../../../_shared/tribeIndex';

export const parseTribe = async (): Promise<ITribe> => {
  const page = await getPage();
  const className = await page.$eval('[class*=tribe]', e => e.className);
  const match = /tribe(\d+)/.exec(className);

  if (!match) {
    throw new Error('Failed to parse tribe');
  }

  const tribeIndex = +match[1];

  if (tribeIndex < 1 || tribeIndex > 7) {
    throw new Error(`Unknown tribe index: ${tribeIndex}`);
  }

  return getTribeFromIndex(tribeIndex);
};
