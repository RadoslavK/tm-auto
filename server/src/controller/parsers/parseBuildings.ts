import { Building } from '../../_models/buildings/building';
import { getPage } from '../browser/getPage';
import { isBuildingField } from '../actions/startBuilding';
import { BuildingType } from '../../_enums/BuildingType';
import { IBuilding } from '../../_types/graphql';

export const parseBuildings = async (): Promise<ReadonlyArray<IBuilding>> => {
  const page = await getPage();
  await page.waitForSelector('#village_map');

  const nodes = await page.$$('#village_map > div');

  const buildings = await Promise.all(nodes
    .map(async node => {
      const className = await node.getProperty('className').then(classNode => classNode.jsonValue());
      const fieldId = +/a(\d+)/.exec(className)[1];

      if (!isBuildingField(fieldId)) {
        return null;
      }

      const type = +/g(\d+)/.exec(className)[1];

      const level = type > BuildingType.None
        ? +await node.$eval('.labelLayer', levelNode => (levelNode as HTMLElement).innerText)
        : 0;

      return {
        level,
        type,
      };
    })
  );

  return buildings
    .filter(b => !!b)
    .map(Building.fromParsed);
};
