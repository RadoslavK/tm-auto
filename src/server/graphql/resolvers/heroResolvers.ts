import { IHeroInformation, IResolvers } from '../../_types/graphql';
import { mapVillage } from '../mappers/mapVillage';
import { villagesService } from '../../services/villageService';
import { heroService } from '../../services/heroService';

export const heroResolvers: IResolvers = {
  Query: {
    heroInformation: (): IHeroInformation => {
      const hero = heroService.get();
      const village = villagesService.get().village(hero.villageId);

      return {
        health: hero.health,
        village: village && mapVillage(village),
      };
    },
  },
};
