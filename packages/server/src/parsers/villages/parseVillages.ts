import { Village } from '../../_models/village/village.js';
import { getPage } from '../../browser/getPage.js';
import { parseNumber } from '../../utils/numberUtils.js';

export const parseVillages = async (): Promise<readonly Village[]> => {
  const page = await getPage();
  const villageNodes = await page.$$('#sidebarBoxVillagelist [href*=newdid]');

  return await Promise.all(
    villageNodes.map(async (villageNode) => {
      const link = await villageNode
        .getProperty('href')
        .then((x) => x.jsonValue());
      const idMatch = /newdid=(\d+)/.exec(link as string);

      if (!idMatch) {
        throw new Error('Failed to parse village id');
      }

      const [, id] = idMatch;

      const name = await villageNode.$eval(
        '[class=name]',
        (x) => (x as HTMLElement).innerText,
      );

      const xText = await villageNode.$eval(
        '[class=coordinateX]',
        (x) => (x as HTMLElement).innerText,
      );
      const yText = await villageNode.$eval(
        '[class=coordinateY]',
        (x) => (x as HTMLElement).innerText,
      );

      //  minus symbol correction
      const x = parseNumber(xText);
      const y = parseNumber(yText);

      if (!x || !y) {
        throw new Error('Failed to parse village coords');
      }

      return new Village({
        coords: { x, y },
        id,
        name,
      });
    }),
  );
};
