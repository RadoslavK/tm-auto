import { Hero } from '../../_models/hero/hero';
import { HeroInformation } from '../../_types/graphql';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';
import { mapVillage } from './villageResolvers';

const mapHeroInformation = (hero: Hero): HeroInformation => {
  const village = hero.villageId ? accountContext.villageService.village(hero.villageId) : null;

  return {
    health: hero.health,
    state: hero.state,
    village: village && mapVillage(village),
  };
};

export const heroResolvers: Resolvers = {
  Query: {
    heroInformation: (): HeroInformation => {
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
