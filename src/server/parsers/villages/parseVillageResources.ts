import { Resources } from '../../_models/misc/resources';
import { getPage } from '../../browser/getPage';
import { logException } from '../../../../_shared/utils/logException';

export const parseVillageResources = async (): Promise<Resources> => {
  const page = await getPage();
  const content = await page.content();

  const match = / storage: {"l1": (.*?),"l2": (.*?),"l3": (.*?),"l4": (.*?)}/.exec(content);
  const freeCropMatch = /production: {"l1": .*?,"l2": .*?,"l3": .*?,"l4": .*?,"l5": (.*?)}/.exec(content);

  if (!match || !freeCropMatch) {
    throw logException('Can not parse village resources');
  }

  const wood = Math.floor(+match[1]);
  const clay = Math.floor(+match[2]);
  const iron = Math.floor(+match[3]);
  const crop = Math.floor(+match[4]);
  const freeCrop = Math.floor(+freeCropMatch[1]);

  return new Resources({
    wood,
    clay,
    iron,
    crop,
    freeCrop,
  })
};