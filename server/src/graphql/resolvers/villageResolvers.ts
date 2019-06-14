import { IResolvers } from '../../_types/graphql';
import { context } from '../context';
import { mapVillage } from '../mappers/mapVillage';
import { Events } from '../subscriptions/events';
import { pubSub } from '../subscriptions/pubSub';

export const villageResolvers: IResolvers = {
  Query: {
    village: (_, args) => mapVillage(context.villages.village(args.villageId)),

    villages: () => context.villages.all().map(mapVillage),
  },

  Subscription: {
    updateVillage: {
      subscribe: () => pubSub.asyncIterator(Events.VillageUpdated),
      resolve: () => true,
    }
  }
};
