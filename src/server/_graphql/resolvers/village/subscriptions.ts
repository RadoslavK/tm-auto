import { Resolvers } from '../../_types';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
  Subscription: {
    activeVillageIdChanged: subscribeToEvent(BotEvent.ActiveVillageIdChanged, {
      resolve: p => p.villageId,
    }),

    crannyCapacityChanged: subscribeToEvent(BotEvent.CrannyCapacityUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: () => true,
    }),

    updateVillage: subscribeToEvent(BotEvent.VillageUpdated, {
      resolve: () => true,
    }),

    updateVillages: subscribeToEvent(BotEvent.VillagesUpdated, {
      resolve: () => true,
    }),
  },
};