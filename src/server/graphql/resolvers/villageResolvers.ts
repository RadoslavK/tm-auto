import { accountContext } from '../../accountContext';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';

export const villageResolvers: Resolvers = {
  Query: {
    village: (_, args) => accountContext.villageService.village(args.villageId),

    villages: () => accountContext.villageService.allVillages(),
  },

  Subscription: {
    updateVillage: subscribeToEvent(BotEvent.VillageUpdated, {
      resolve: () => true,
    }),

    updateVillages: subscribeToEvent(BotEvent.VillagesUpdated, {
      resolve: () => true,
    }),
  },
};
