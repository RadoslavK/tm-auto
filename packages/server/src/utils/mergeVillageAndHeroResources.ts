import { Resources } from '../_models/misc/resources.js';
import { AccountContext } from '../accountContext.js';
import { getUsableHeroResources } from './getUsableHeroResources.js';

export const mergeVillageAndHeroResources = (villageId: string): Resources => {
  const { villageService } = AccountContext.getContext();
  const village = villageService.village(villageId);
  const warehouseCapacity = village.resources.capacity.warehouse;
  const granaryCapacity = village.resources.capacity.granary;
  const currentResources = village.resources.amount;

  const usableHeroResources = getUsableHeroResources(villageId);

  return currentResources.add(usableHeroResources).mergeMin(
    new Resources({
      wood: warehouseCapacity,
      clay: warehouseCapacity,
      iron: warehouseCapacity,
      crop: granaryCapacity,
      freeCrop: currentResources.freeCrop,
    }),
  );
};
