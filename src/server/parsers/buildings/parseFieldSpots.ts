import { TravianPath } from '../../_enums/TravianPath';
import { IActualBuilding } from '../../_models/buildings';
import { getPage } from '../../browser/getPage';
import { validateUrl } from '../../utils/validateUrl';
import { logException } from '../../../../_shared/utils/logException';

const acceptedUrls: readonly string[] = [
  TravianPath.ResourceFieldsOverview,
];

export const parseFieldSpots = async (): Promise<IActualBuilding[]> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();
  await page.waitForSelector('#village_map');

  const nodes = await page.$$('#village_map > div');

  return Promise.all(nodes.map(async (node, index): Promise<IActualBuilding> => {
    const classNameProperty = await node.getProperty('className');
    const className = await classNameProperty.jsonValue();

    const levelMatch = /level(\d+)/.exec(className);

    if (!levelMatch) {
      throw logException('Failed to parse field level');
    }

    const level = +levelMatch[1];

    const typeMatch = /gid(\d+)/.exec(className);

    if (!typeMatch) {
      throw logException('Failed to parse field type');
    }

    const type = +typeMatch[1];

    return {
      fieldId: index + 1,
      level,
      type,
    };
  }));
};
