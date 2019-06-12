import { TravianPath } from '../../_enums/TravianPath';
import { IActualBuilding } from '../../_models/buildings';
import { getPage } from '../../browser/getPage';
import { validateUrl } from '../../utils/validateUrl';

const acceptedUrls: readonly string[] = [
  TravianPath.ResourceFieldsOverview,
];

export const parseFieldSpots = async (): Promise<IActualBuilding[]> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();
  await page.waitForSelector('#village_map');

  const nodes = await page.$$('#village_map > div');

  return await Promise.all(nodes.map(async (node, index): Promise<IActualBuilding> => {
    const classNameProperty = await node.getProperty('className');
    const className = await classNameProperty.jsonValue();

    const level = +/level(\d+)/.exec(className)[1];
    const type = +/gid(\d+)/.exec(className)[1];

    return {
      fieldId: index + 1,
      level,
      type,
    };
  }));
};
