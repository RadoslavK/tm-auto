import {
  IHeroInformation,
  IResolvers,
} from '../../_types/graphql';
import { mapVillage } from '../mappers/mapVillage';
import { accountContext } from '../../accountContext';
import {
  subscribeToEvent,
} from '../subscriptions/pubSub';
import { BotEvent } from '../subscriptions/botEvent';
import { Hero } from '../../_models/hero/hero';

const mapHeroInformation = (hero: Hero): IHeroInformation => {
  const village = accountContext.villageService.village(hero.villageId);

  return {
    health: hero.health,
    state: hero.state,
    village: village && mapVillage(village),
  };
};

export const heroResolvers: IResolvers = {
  Query: {
    heroInformation: (): IHeroInformation => {
      const { hero } = accountContext;

      return mapHeroInformation(hero);
    },
  },

  Subscription: {
    heroInformationUpdated: subscribeToEvent(BotEvent.HeroInformationUpdated, {
      resolve: p => p.heroInformation,
    }),
  },
};
