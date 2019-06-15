import { IHeroInformation, IResolvers } from '../../_types/graphql';
import { context } from '../context';
import { mapVillage } from '../mappers/mapVillage';

export const heroResolvers: IResolvers = {
  Query: {
    heroInformation: (): IHeroInformation => {
      const hero = context.hero;
      const village = context.villages.village(hero.villageId);

      return {
        health: hero.health,
        village: village && mapVillage(village),
      };
    },
  },
};
