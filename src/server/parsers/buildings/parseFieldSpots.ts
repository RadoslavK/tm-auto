import { TravianPath } from '../../_enums/travianPath';
import { ActualBuilding } from '../../_models/buildings/actual/actualBuilding';
import { getPage } from '../../browser/getPage';
import { validateUrl } from '../../utils/validateUrl';

const acceptedUrls: readonly string[] = [
  TravianPath.ResourceFieldsOverview,
];

export const parseFieldSpots = async (): Promise<ActualBuilding[]> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();
  await page.waitForSelector('#village_map');

  const nodes = await page.$$('#village_map > div');

  return Promise.all(nodes.map(async (node, index): Promise<ActualBuilding> => {
    const className = await page.evaluate((el: Element) => el.className, node);

    const levelMatch = /level(\d+)/.exec(className);

    if (!levelMatch) {
      throw new Error('Failed to parse field level');
    }

    const level = +levelMatch[1];

    const typeMatch = /gid(\d+)/.exec(className);

    if (!typeMatch) {
      throw new Error('Failed to parse building type');
    }

    const type = +typeMatch[1];

    return new ActualBuilding({
      fieldId: index + 1,
      level,
      type,
    });
  }));
};

export const parseFieldSpotsNew = async (): Promise<ActualBuilding[]> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();

  return page.$$eval('#resourceFieldContainer div.level[class*=buildingSlot][class*=gid]', xx => xx.map((x): ActualBuilding => {
    const match = /gid(\d+).*?buildingSlot(\d+).*?level(\d+)/.exec(x.className);

    if (!match) {
      throw new Error('Failed to parse resource field spot');
    }

    return {
      fieldId: +match[2],
      level: +match[3],
      type: +match[1],
    };
  }));
};
