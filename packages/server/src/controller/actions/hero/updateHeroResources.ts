import { TravianPath } from '../../../_enums/travianPath.js';
import { Resources } from '../../../_models/misc/resources.js';
import { AccountContext } from '../../../accountContext.js';
import { heroItemIds } from '../../../constants/heroItemIds.js';
import { getHeroInventoryItem } from '../../../parsers/hero/getHeroInventoryItem.js';
import { ensurePage } from '../ensurePage.js';

export const updateHeroResources = async (): Promise<void> => {
  await ensurePage(TravianPath.Hero, true);

  const { amount: wood } = await getHeroInventoryItem(heroItemIds.wood);
  const { amount: clay } = await getHeroInventoryItem(heroItemIds.clay);
  const { amount: iron } = await getHeroInventoryItem(heroItemIds.iron);
  const { amount: crop } = await getHeroInventoryItem(heroItemIds.crop);

  const { hero } = AccountContext.getContext();

  hero.hasHorseInInventory = !!(await getHeroInventoryItem(heroItemIds.horse))
    .amount;

  hero.resources = new Resources({
    wood,
    clay,
    iron,
    crop,
  });
};
