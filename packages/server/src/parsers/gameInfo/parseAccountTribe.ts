import { Tribe } from 'shared/enums/Tribe.js';

import { TravianPath } from '../../_enums/travianPath.js';
import { browserManager } from '../../browser/browserManager.js';
import { ensurePage } from '../../controller/actions/ensurePage.js';

export const parseAccountTribe = async (): Promise<Tribe> => {
  const page = await browserManager.getPage();

  await ensurePage(TravianPath.ResourceFieldsOverview);

  const className = await page.$eval(
    '#resourceFieldContainer',
    (x) => x.className,
  );

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
