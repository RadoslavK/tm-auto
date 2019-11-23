import { IHeroInformation, IResolvers } from '../../_types/graphql';
import { mapVillage } from '../mappers/mapVillage';
import { accountContext } from '../../accountContext';

export const heroResolvers: IResolvers = {
  Query: {
    heroInformation: (): IHeroInformation => {
      const { hero } = accountContext;
      const village = accountContext.villageService.village(hero.villageId);

      return {
        health: hero.health,
        village: village && mapVillage(village),
      };
    },
  },
};
