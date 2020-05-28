import { Hero } from '../../_models/hero/hero';
import { HeroInformation } from '../../_types/graphql';
import { accountContext } from '../../accountContext';
import { mapVillage } from './villageMappers';

export const mapHeroInformation = (hero: Hero): HeroInformation => {
  const village = hero.villageId ? accountContext.villageService.village(hero.villageId) : null;

  return {
    health: hero.health,
    state: hero.state,
    village: village && mapVillage(village),
  };
};