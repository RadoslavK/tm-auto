import { Page } from 'puppeteer';
import { TravianPath } from '../../_enums/TravianPath';
import { BuildingSpot } from '../../_models/buildings/buildingSpot';
import { validateUrl } from '../../utils/validateUrl';

const acceptedUrls: readonly string[] = [
  TravianPath.ResourceFieldsOverview,
];

export const parseFieldSpots = async (page: Page): Promise<BuildingSpot[]> => {
  validateUrl(page, acceptedUrls);
  await page.waitForSelector('#village_map');

  const nodes = await page.$$('#village_map > div');

  return await Promise.all(nodes.map(async (node) => {
    const classNameProperty = await node.getProperty('className');
    const className = await classNameProperty.jsonValue();

    const level = +/level(\d+)/.exec(className)[1];
    const type = +/gid(\d+)/.exec(className)[1];

    return new BuildingSpot({
      level,
      type,
    });
  }));
};
