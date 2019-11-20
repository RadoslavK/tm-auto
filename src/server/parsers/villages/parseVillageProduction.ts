import { TravianPath } from '../../_enums/TravianPath';
import { Resources } from '../../_models/misc/resources';
import { getPage } from '../../browser/getPage';
import { validateUrl } from '../../utils/validateUrl';
import { logException } from '../../../../_shared/utils/logException';

const acceptedUrls: readonly string[] = [
  TravianPath.ResourceFieldsOverview,
];

export const parseVillageProduction = async (): Promise<Resources> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();
  const content = await page.content();

  const match = /production: {"l1": (.*?),"l2": (.*?),"l3": (.*?),"l4": (.*?),/.exec(content);

  if (!match) {
    throw logException('Can not parse village production');
  }

  const wood = Math.floor(+match[1]);
  const clay = Math.floor(+match[2]);
  const iron = Math.floor(+match[3]);
  const crop = Math.floor(+match[4]);

  return new Resources({
    wood,
    clay,
    iron,
    crop,
  })
};