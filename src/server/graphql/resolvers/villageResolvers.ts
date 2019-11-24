import { IResolvers } from '../../_types/graphql';
import { mapVillage } from '../mappers/mapVillage';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { accountContext } from '../../accountContext';

export const villageResolvers: IResolvers = {
  Query: {
    village: (_, args) => mapVillage(accountContext.villageService.village(args.villageId)),

    villages: () => accountContext.villageService.allVillages().map(mapVillage),
  },

  Subscription: {
    updateVillage: subscribeToEvent(BotEvent.VillageUpdated, {
      resolve: () => true,
    }),

    updateVillages: subscribeToEvent(BotEvent.VillagesUpdated, {
      resolve: () => true,
    }),
  }
};
