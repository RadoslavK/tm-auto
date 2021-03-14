import { BuildingType } from '../../../../../../_shared/enums/BuildingType';
import { TravianPath } from '../../../../_enums/travianPath';
import { getAccountContext } from '../../../../accountContext';
import { getPage } from '../../../../browser/getPage';
import { replaceInputText } from '../../../../utils/browser/replaceInputText';
import { sendAjaxRequest } from '../../../../utils/sendAjaxRequest';
import { ensureBuildingSpotPage, ensurePage } from '../../ensurePage';

const parseCenterCoords = (pageContent: string) => {
  const match = /mapInitialPosition: {\s*?x:\s(-?\d+),\s*y:\s(-?\d+)/s.exec(
    pageContent,
  );

  if (!match) {
    throw new Error('Failed to parse map center coords');
  }

  return { x: +match[1], y: +match[2] };
};

const findFreeOasesInArea = async (x: number, y: number) => {
  const { tiles } = await sendAjaxRequest<{ readonly tiles: any[] }>(
    'mapPositionData',
    {
      data: {
        ignorePositions: [],
        x,
        y,
        zoomLevel: 1,
      },
    },
  );

  return tiles.filter((t: any) => t.title && t.title.includes('k.fo'));
};

export const raidOasis = async (): Promise<boolean> => {
  const { villageService } = getAccountContext();

  const rallyPoint = villageService
    .currentVillage()
    .buildings.spots.buildings()
    .find((b) => b.type === BuildingType.RallyPoint && b.level.actual >= 1);

  if (!rallyPoint) {
    return false;
  }

  await ensurePage(TravianPath.ResourceFieldsOverview);

  const page = await getPage();

  const troopRows = await page.$$('#troops tbody tr');

  const {
    gameInfo: { tribe },
  } = getAccountContext();

  let count;

  for (const troopRow of troopRows) {
    const unitIndex = await troopRow.$eval('td img.unit', (x) => {
      const unitIndexMatch = /u(\d+)/.exec(x.className);

      if (!unitIndexMatch) {
        return null;
      }

      return +unitIndexMatch[1];
    });

    const isValidUnit = !!unitIndex && unitIndex - (tribe - 1) * 10 === 1;

    if (!isValidUnit) {
      continue;
    }

    count = await troopRow.$eval('td.num', (x) => {
      return +(x as HTMLElement).innerText;
    });

    if (count) {
      break;
    }
  }

  if (!count) {
    return false;
  }

  await ensurePage(TravianPath.CenterMap);

  const content = await page.content();
  const centerCoords = parseCenterCoords(content);

  const freeOases = await findFreeOasesInArea(centerCoords.x, centerCoords.y);

  if (!freeOases.length) {
    throw new Error('Didnt find a free oasis');
  }

  const [{ position }] = freeOases;

  await ensurePage(TravianPath.InfrastructureOverview);
  await ensureBuildingSpotPage(rallyPoint.fieldId, { name: 'tt', index: 2 });

  const firstUnitInput = await page.$('#troops tbody tr:first-child input');

  if (!firstUnitInput) {
    throw new Error('Did not find input for first unit');
  }

  await replaceInputText(page, firstUnitInput, '1');

  const xCoordInput = await page.$('input[name="x"]');

  if (!xCoordInput) {
    throw new Error('Did not find X coord input');
  }

  await replaceInputText(page, xCoordInput, position.x);

  const yCoordInput = await page.$('input[name="y"]');

  if (!yCoordInput) {
    throw new Error('Did not find X coord input');
  }

  await replaceInputText(page, yCoordInput, position.y);

  const raidRadioButton = await page.$('input[name="c"][value="4"]');

  if (!raidRadioButton) {
    throw new Error('Did not find raid option');
  }

  await raidRadioButton.click();

  let submitButton = await page.$('button[type="submit"]');

  if (!submitButton) {
    throw new Error('Submit button not found');
  }

  await Promise.all([
    submitButton.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);

  submitButton = await page.$('button[type="submit"][name="a"]');

  if (!submitButton) {
    throw new Error('Submit button not found');
  }

  await Promise.all([
    submitButton.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);

  const abortButton = await page.$('table.outRaid tbody .abort button');

  if (!abortButton) {
    throw new Error('Did not find abort button');
  }

  await Promise.all([
    abortButton.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);

  return true;
};
