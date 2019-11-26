import {
  IHeroInformation,
} from '../../_types/graphql';
import { accountContext } from '../../accountContext';
import {
  subscribeToEvent,
} from '../subscriptions/pubSub';
import { BotEvent } from '../subscriptions/botEvent';
import { Hero } from '../../_models/hero/hero';
import { Resolvers } from './_types';

const mapHeroInformation = (hero: Hero): IHeroInformation => {
  const village = hero.villageId ? accountContext.villageService.village(hero.villageId) : null;

  return {
    health: hero.health,
    state: hero.state,
    village,
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
