import { Resolvers } from '../../_types';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers> {
  Subscription: {
    onQueueUpdated: subscribeToEvent(BotEvent.QueuedUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: () => true,
    }),
  },
};