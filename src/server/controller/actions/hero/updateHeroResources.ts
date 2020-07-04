import { TravianPath } from '../../../_enums/travianPath';
import { Resources } from '../../../_models/misc/resources';
import { getAccountContext } from '../../../accountContext';
import { heroItemIds } from '../../../constants/heroItemIds';
import { getHeroInventoryItem } from '../../../parsers/hero/getHeroInventoryItem';
import { ensurePage } from '../ensurePage';

export const updateHeroResources = async (): Promise<void> => {
  await ensurePage(TravianPath.Hero, true);

  const { amount: wood } = await getHeroInventoryItem(heroItemIds.wood);
  const { amount: clay } = await getHeroInventoryItem(heroItemIds.clay);
  const { amount: iron } = await getHeroInventoryItem(heroItemIds.iron);
  const { amount: crop } = await getHeroInventoryItem(heroItemIds.crop);

  const { hero } = getAccountContext();

  hero.hasHorseInInventory = !!(await getHeroInventoryItem(heroItemIds.horse))
    .amount;

  hero.resources = new Resources({
    wood,
    clay,
    iron,
    crop,
  });
};
