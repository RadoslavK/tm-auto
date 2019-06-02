import { Building, IBuilding } from '../../models/buildings/building';
import { getPage } from '../../utils/getPage';

export interface IParsedBuilding {
  readonly level: number;
  readonly type: number;
}

export const parseResourceFields = async (): Promise<ReadonlyArray<IBuilding>> => {
  const page = await getPage();
  await page.waitForSelector('#village_map');

  const fields = await page.$$eval('#village_map > div', nodes =>
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
