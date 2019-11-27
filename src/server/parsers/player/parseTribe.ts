import { ITribe } from '../../_types/graphql';
import { getPage } from '../../browser/getPage';

const getTribeFromIndex = (index: number): ITribe => {
  switch (index) {
    case 1: return ITribe.Romans;
    case 2: return ITribe.Teutons;
    case 3: return ITribe.Gauls;
    case 4: return ITribe.Nature;
    case 5: return ITribe.Natars;
    case 6: return ITribe.Egyptians;
    case 7: return ITribe.Huns;
    default: throw new Error(`Unknown tribe index: ${index}`);
  }
};

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
