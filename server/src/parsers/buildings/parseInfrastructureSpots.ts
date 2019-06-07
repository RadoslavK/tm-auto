import { Page } from 'puppeteer';
import { TravianPath } from '../../_enums/TravianPath';
import { BuildingSpot } from '../../_models/buildings/buildingSpot';
import { isBuildingField } from '../../controller/actions/build/startBuilding';
import { BuildingType } from '../../_enums/BuildingType';
import { validateUrl } from '../../utils/validateUrl';

const acceptedUrls: readonly string[] = [
  TravianPath.InfrastructureOverview,
];

export const parseInfrastructureSpots = async (page: Page): Promise<readonly BuildingSpot[]> => {
  validateUrl(page,acceptedUrls);
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

      return new BuildingSpot({
        level,
        type,
      });
    })
  );

  return buildings
    .filter(b => !!b)
};
