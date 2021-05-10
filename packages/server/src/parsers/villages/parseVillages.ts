import { Village } from '../../_models/village/village.js';
import { browserManager } from '../../browser/browserManager.js';
import { parseNumber } from '../../utils/numberUtils.js';

export const parseVillages = async (): Promise<readonly Village[]> => {
  const page = await browserManager.getPage();

  const villages: Village[] = [];
  const villageNodes = await page.$$('#sidebarBoxVillagelist ul li');

  for (const villageNode of villageNodes) {
    const id = await villageNode.$eval('[href*="newdid"]', x => /(\d+)/.exec(x.getAttribute('href') ?? '')?.[1]);
    const name = await villageNode.$eval('.name', x => x.textContent);
    const x = await villageNode.$eval('.coordinatesGrid .coordinateX', x => x.textContent);
    const y = await villageNode.$eval('.coordinatesGrid .coordinateX', x => x.textContent);

    if (!id || !name || !x || !y) {
      throw new Error('Failed to parse village');
    }

    const coordX = parseNumber(x);
    const coordY = parseNumber(y);

    if (!coordX || !coordY) {
      throw new Error('Failed to parse coords');
    }

    villages.push(new Village({
      id,
      name,
      coords: {
        x: coordX,
        y: coordY,
      },
    }));
  }

  return villages;
};
