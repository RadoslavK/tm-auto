import { Resolvers } from '../../_types';
import { BotEvent } from '../../../events/botEvent';
import { mapHeroInformation } from '../../mappers/mapHeroInformation';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
  Subscription: {
    heroInformationUpdated: subscribeToEvent(BotEvent.HeroInformationUpdated, {
      resolve: p => mapHeroInformation(p.heroInformation),
    }),
  },
};