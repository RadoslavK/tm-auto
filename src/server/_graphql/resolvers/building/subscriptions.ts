import { Resolvers } from '../../_types';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
  Subscription: {
    buildingsUpdated: subscribeToEvent(BotEvent.BuildingsUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: () => true,
    }),
  },
};