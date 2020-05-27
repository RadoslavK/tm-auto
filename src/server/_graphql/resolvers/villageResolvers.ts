import { Resources as ResourcesModel } from '../../_models/misc/resources';
import { Village as VillageModel } from '../../_models/village/village';
import { VillageCrannyCapacity } from '../../_models/village/villageCrannyCapacity';
import {
  Resources,
  Village,
} from '../../_types/graphql';
import { BuildingType } from '../../../_shared/types/buildingType';
import { accountContext } from '../../accountContext';
import { crannyInfoService } from '../../services/crannyInfoService';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';

export const mapResources = (resources: ResourcesModel): Resources => ({
  ...resources,
  total: resources.getTotal(),
});

export const mapVillage = (village: VillageModel): Village => ({
  ...village,
  resources: {
    amount: mapResources(village.resources.amount),
    capacity: village.resources.capacity,
    production: mapResources(village.resources.production),
  },
});

export const villageResolvers: Resolvers = {
  Query: {
    activeVillageId: () => accountContext.villageService.currentVillageId,

    crannyCapacity: (_, args) => {
      const crannies = accountContext.villageService.village(args.villageId).buildings.normalizedBuildingSpots().filter(s => s.type === BuildingType.Cranny);

      const emptyCapacity = new VillageCrannyCapacity();

      if (!crannies.length) {
        return emptyCapacity;
      }

      return crannies
        .reduce<VillageCrannyCapacity>(
          (capacity, cranny) => {
            const actual = crannyInfoService.getCapacity(cranny.level.actual);
            const ongoing = crannyInfoService.getCapacity(cranny.level.actual + cranny.level.ongoing);
            const total = crannyInfoService.getCapacity(cranny.level.total);

            return capacity.add(new VillageCrannyCapacity({
              actual,
              ongoing,
              total,
            }));
          },
          emptyCapacity,
        );
    },

    village: (_, args) => mapVillage(accountContext.villageService.village(args.villageId)),

    villages: () => accountContext.villageService.allVillages().map(x => mapVillage(x)),
  },

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
