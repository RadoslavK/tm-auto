import { IResolvers } from '../../_types/graphql';
import { mapVillage } from '../mappers/mapVillage';
import { Events } from '../subscriptions/events';
import { pubSub } from '../subscriptions/pubSub';
import { villagesService } from '../../services/villageService';

export const villageResolvers: IResolvers = {
  Query: {
    village: (_, args) => mapVillage(villagesService.get().village(args.villageId)),

    villages: () => villagesService.get().all().map(mapVillage),
  },

  Subscription: {
    updateVillage: {
      subscribe: () => pubSub.asyncIterator(Events.VillageUpdated),
      resolve: () => true,
    },

    villages: {
      subscribe: () => pubSub.asyncIterator(Events.VillagesUpdated),
      resolve: () => villagesService.get().all().map(mapVillage),
    },
  }
};
