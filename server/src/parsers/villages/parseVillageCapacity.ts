import { Page } from 'puppeteer';
import { VillageCapacity } from '../../_models/village/villageCapacity';

export const parseVillageCapacity = async (page: Page): Promise<VillageCapacity> => {
  const content = await page.content();
  const match = /maxStorage: {"l1": (.*?),"l2": .*?,"l3": .*?,"l4": (.*?)}/.exec(content);
  const warehouse = +match[1];
  const granary = +match[2];


  return new VillageCapacity({
    granary,
    warehouse,
  });
};
