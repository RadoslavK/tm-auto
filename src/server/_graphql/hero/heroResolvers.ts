import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers> {
  HeroInformation: {
    village: hero => hero.villageId
      ? accountContext.villageService.village(hero.villageId)
      : null,
  },

  Query: {
    heroInformation: () => accountContext.hero,
  },

  Subscription: {
    heroInformationUpdated: subscribeToEvent(BotEvent.HeroInformationUpdated, {
      resolve: () => accountContext.hero,
    }),
  },
};