import { ElementHandle } from 'puppeteer';

import { TravianPath } from '../../_enums/travianPath';
import { Coords } from '../../_models/coords';
import { getPage } from '../../browser/getPage';
import { parseNumber } from '../../utils/numberUtils';
import { validateUrl } from '../../utils/validateUrl';

const acceptedUrls = [TravianPath.PlayerProfile];

export const parseCapitalVillageCoords = async (): Promise<Coords> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();

  const villageElements = await page.$$('table#villages > tbody > tr');
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

  const capitalVillageMapUrl = await capitalVillageElement.$eval('.coords [href*="x"][href*="y"]', x => x.getAttribute('href'));

  if (!capitalVillageMapUrl) {
    throw new Error('No capital village was found');
  }

  const coordsMatch = /x=(.*?)&y=(.*)/.exec(capitalVillageMapUrl);

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