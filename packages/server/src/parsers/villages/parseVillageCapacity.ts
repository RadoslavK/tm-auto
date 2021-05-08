import { VillageCapacity } from '../../_models/village/villageCapacity.js';
import { browserManager } from '../../browser/browserManager.js';

export const parseVillageCapacity = async (): Promise<VillageCapacity> => {
  const page = await browserManager.getPage();
  const content = await page.content();
  const match = /maxStorage: {"l1": (.*?),"l2": .*?,"l3": .*?,"l4": (.*?)}/.exec(
    content,
  );

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
