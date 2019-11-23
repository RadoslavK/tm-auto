import { IResolvers } from '../../_types/graphql';
import { mapVillage } from '../mappers/mapVillage';
import { Events } from '../subscriptions/events';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { accountContext } from '../../accountContext';

export const villageResolvers: IResolvers = {
  Query: {
    village: (_, args) => mapVillage(accountContext.villageService.village(args.villageId)),

    villages: () => accountContext.villageService.allVillages().map(mapVillage),
  },

  Subscription: {
    updateVillage: {
      subscribe: subscribeToEvent(Events.VillageUpdated),
      resolve: () => true,
    },

    updateVillages: {
      subscribe: subscribeToEvent(Events.VillagesUpdated),
      resolve: () => true,
    },
  }
};
