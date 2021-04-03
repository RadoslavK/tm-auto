import { Resources } from '../_models/misc/resources.js';
import {
  AccountContext,
} from '../accountContext.js';

export const mergeVillageAndHeroResources = (villageId: string): Resources => {
  const { hero, villageService } = AccountContext.getContext();
  const village = villageService.village(villageId);
  const warehouseCapacity = village.resources.capacity.warehouse;
  const granaryCapacity = village.resources.capacity.granary;
  const currentResources = village.resources.amount;

  return currentResources.add(hero.resources).mergeMin(
    new Resources({
      wood: warehouseCapacity,
      clay: warehouseCapacity,
      iron: warehouseCapacity,
      crop: granaryCapacity,
      freeCrop: currentResources.freeCrop,
    }),
  );
};
