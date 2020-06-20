import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
  HeroInformation: {
    village: (hero) =>
      hero.villageId
        ? getAccountContext().villageService.village(hero.villageId)
        : null,
  },

  Query: {
    heroInformation: () => getAccountContext().hero,
  },

  Subscription: {
    heroInformationUpdated: subscribeToEvent(BotEvent.HeroInformationUpdated, {
      resolve: () => getAccountContext().hero,
    }),
  },
};
