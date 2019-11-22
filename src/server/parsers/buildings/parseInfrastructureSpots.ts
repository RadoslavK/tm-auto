import { TravianPath } from '../../_enums/TravianPath';
import { IActualBuilding } from '../../_models/buildings';
import { getPage } from '../../browser/getPage';
import { isInfrastructure } from '../../utils/buildingUtils';
import { BuildingType } from '../../_enums/BuildingType';
import { validateUrl } from '../../utils/validateUrl';
import { logException } from '../../../_shared/utils/logException';

const acceptedUrls: readonly string[] = [
  TravianPath.InfrastructureOverview,
];

export const parseInfrastructureSpots = async (): Promise<readonly IActualBuilding[]> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();
  await page.waitForSelector('#village_map');

  const nodes = await page.$$('#village_map > div');

  const buildings = await Promise.all(nodes.map(async (node): Promise<IActualBuilding | null> => {
    const className = await node.getProperty('className').then(classNode => classNode.jsonValue());
    const fieldIdMatch = /a(\d+)/.exec(className);

    if (!fieldIdMatch) {
      throw logException('Failed to parse field id');
    }

    const fieldId = +fieldIdMatch[1];

    if (!isInfrastructure(fieldId)) {
      return null;
    }

    const typeMatch = /g(\d+)/.exec(className);

    if (!typeMatch) {
      throw logException('Failed to parse field type');
    }

    const type = +typeMatch[1];

    const level = type > BuildingType.None
      ? +await node.$eval('.labelLayer', levelNode => (levelNode as HTMLElement).innerText)
      : 0;

    return {
      fieldId,
      level,
      type,
    };
  }));

  const uniqueFieldIds: number[] = [];

  return buildings
    .filter(b => {
      if (!!b && !uniqueFieldIds.includes(b.fieldId)) {
        uniqueFieldIds.push(b.fieldId);
        return true;
      }

      return false;
    }) as readonly IActualBuilding[];
};
