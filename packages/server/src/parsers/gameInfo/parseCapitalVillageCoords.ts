import type { ElementHandle } from 'puppeteer-core';

import { TravianPath } from '../../_enums/travianPath.js';
import { Coords } from '../../_models/coords.js';
import { browserManager } from '../../browser/browserManager.js';
import { parseNumber } from '../../utils/numberUtils.js';
import { validateUrl } from '../../utils/validateUrl.js';

const acceptedUrls = [TravianPath.PlayerProfile];

export const parseCapitalVillageCoords = async (): Promise<Coords> => {
  await validateUrl(acceptedUrls);

  const page = await browserManager.getPage();

  const villageElements = await page.$$('#villages > tbody > tr');
  let capitalVillageElement: ElementHandle | null = null;

  for (const villageElement of villageElements) {
    const capitalVillageTag = await villageElement.$('.mainVillage');

    if (capitalVillageTag) {
      capitalVillageElement = villageElement;
      break;
    }
  }

  if (!capitalVillageElement) {
    throw new Error('No capital village was found');
  }

  const capitalVillageUrl = await capitalVillageElement.$eval(
    '.coords [href*="x"][href*="y"]',
    (x) => x.getAttribute('href'),
  );

  if (!capitalVillageUrl) {
    throw new Error('No capital village was found');
  }

  const coordsMatch = /x=(.*?)&y=(.*)/.exec(capitalVillageUrl);

  if (!coordsMatch || coordsMatch.length !== 3) {
    throw new Error('Failed to parse capital village coords');
  }

  const x = parseNumber(coordsMatch[1]);
  const y = parseNumber(coordsMatch[2]);

  if (!x || !y) {
    throw new Error('Failed to parse capital village coords');
  }

  return new Coords({ x, y });
};
