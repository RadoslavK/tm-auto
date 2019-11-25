import {
  IHeroInformation,
} from '../../_types/graphql';
import { mapVillage } from '../mappers/mapVillage';
import { accountContext } from '../../accountContext';
import {
  subscribeToEvent,
} from '../subscriptions/pubSub';
import { BotEvent } from '../subscriptions/botEvent';
import { Hero } from '../../_models/hero/hero';
import { Resolvers } from './_types';

const mapHeroInformation = (hero: Hero): IHeroInformation => {
  const village = accountContext.villageService.village(hero.villageId);

  return {
    health: hero.health,
    state: hero.state,
    village: village && mapVillage(village),
  };
};

export const heroResolvers: Resolvers = {
  Query: {
    heroInformation: (): IHeroInformation => {
      const { hero } = accountContext;

      return mapHeroInformation(hero);
    },
  },

  Subscription: {
    heroInformationUpdated: subscribeToEvent(BotEvent.HeroInformationUpdated, {
      resolve: p => mapHeroInformation(p.heroInformation),
    }),
  },
};
