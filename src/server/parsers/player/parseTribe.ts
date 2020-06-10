import { TravianPath } from '../../_enums/travianPath';
import { Tribe } from '../../../_shared/types/tribe';
import { getPage } from '../../browser/getPage';
import { ensurePage } from '../../controller/actions/ensurePage';

export const parseTribe = async (): Promise<Tribe> => {
  const page = await getPage();

  await ensurePage(TravianPath.ResourceFieldsOverview);

  const className = await page.$eval('#resourceFieldContainer', x => x.className);

  const match = /tribe(\d+)/.exec(className);

  if (!match) {
    throw new Error('Failed to parse tribe');
  }

  const tribeIndex = +match[1];

  if (tribeIndex < Tribe.Romans || tribeIndex > Tribe.Huns) {
    throw new Error(`Unknown tribe index: ${tribeIndex}`);
  }

  return tribeIndex;
};
