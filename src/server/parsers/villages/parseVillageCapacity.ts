import { VillageCapacity } from '../../_models/village/villageCapacity';
import { getPage } from '../../browser/getPage';

export const parseVillageCapacity = async (): Promise<VillageCapacity> => {
  const page = await getPage();
  const content = await page.content();
  const match = /maxStorage: {"l1": (.*?),"l2": .*?,"l3": .*?,"l4": (.*?)}/.exec(content);

  if (!match) {
    throw new Error('Failed to parse village capacity');
  }

  const warehouse = +match[1];
  const granary = +match[2];


  return new VillageCapacity({
    granary,
    warehouse,
  });
};
