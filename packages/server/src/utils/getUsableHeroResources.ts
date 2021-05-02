import { Resources } from '../_models/misc/resources.js';
import { AccountContext } from '../accountContext.js';

export const canUseHeroResourcesInVillage = (villageId: string): boolean => {
  const { settingsService } = AccountContext.getContext();
  const canUseInVillage = settingsService.village(villageId).general.get().useHeroResources;

  return settingsService.account.get().useHeroResources
    && (canUseInVillage.wood || canUseInVillage.clay || canUseInVillage.iron || canUseInVillage.crop);
};

export const getUsableHeroResources = (villageId: string): Resources => {
  const { hero, settingsService } = AccountContext.getContext();

  const canUseInVillage = settingsService.village(villageId).general.get().useHeroResources;
  const heroResources = hero.resources;

  return new Resources({
    wood: canUseInVillage.wood ? heroResources.wood : 0,
    clay: canUseInVillage.clay ? heroResources.clay : 0,
    iron: canUseInVillage.iron ? heroResources.iron : 0,
    crop: canUseInVillage.crop ? heroResources.crop : 0,
  });
};