import { Building } from '../../_models/buildings/building';
import { getPage } from '../browser/getPage';

export interface IParsedBuilding {
  readonly level: number;
  readonly type: number;
}

export const parseResourceFields = async (): Promise<Building[]> => {
  const page = await getPage();
  await page.waitForSelector('#village_map');

  const fields: readonly IParsedBuilding[] = await page.$$eval('#village_map > div', nodes =>
    nodes.map(node => {
      const level = +/level(\d+)/.exec(node.className)[1];
      const type = +/gid(\d+)/.exec(node.className)[1];

      return {
        level,
        type,
      };
    }));

  return fields.map(Building.fromParsed);
};
