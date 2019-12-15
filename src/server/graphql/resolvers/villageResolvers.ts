import { BuildingType } from '../../../_shared/types/buildingType';
import { IVillageCrannyCapacity } from '../../_types/graphql';
import { accountContext } from '../../accountContext';
import { crannyInfoService } from '../../services/crannyInfoService';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';

export const villageResolvers: Resolvers = {
  Query: {
    activeVillageId: () => accountContext.villageService.currentVillageId,

    village: (_, args) => accountContext.villageService.village(args.villageId),

    villages: () => accountContext.villageService.allVillages(),

    crannyCapacity: (_, args) => {
      const crannies = accountContext.villageService.village(args.villageId).buildings.normalizedBuildingSpots().filter(s => s.type === BuildingType.Cranny);

      return crannies
        .reduce<IVillageCrannyCapacity>(
          (capacity, cranny) => {
            const actual = crannyInfoService.getCapacity(cranny.level.actual);
            const ongoing = crannyInfoService.getCapacity(cranny.level.actual + cranny.level.ongoing);
            const total = crannyInfoService.getCapacity(cranny.level.total);

            return {
              actual: capacity.actual + actual,
              ongoing: capacity.ongoing + ongoing,
              total: capacity.total + total,
            };
          },
          { actual: 0, ongoing: 0, total: 0 },
        );
    },
  },

  Subscription: {
    updateVillage: subscribeToEvent(BotEvent.VillageUpdated, {
      resolve: () => true,
    }),

    updateVillages: subscribeToEvent(BotEvent.VillagesUpdated, {
      resolve: () => true,
    }),

    activeVillageIdChanged: subscribeToEvent(BotEvent.ActiveVillageIdChanged, {
      resolve: p => p.villageId,
    }),

    crannyCapacityChanged: subscribeToEvent(BotEvent.CrannyCapacityUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: () => true,
    }),
  },
};
