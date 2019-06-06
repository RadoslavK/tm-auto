import { BuildingSpot } from '../../_models/buildings/buildingSpot';
import { getPage } from '../browser/getPage';

export const parseFieldSpots = async (): Promise<BuildingSpot[]> => {
  const page = await getPage();
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
