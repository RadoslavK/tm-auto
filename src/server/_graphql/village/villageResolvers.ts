import { BuildingType } from '../../_models/enums/buildingType';
import { VillageCrannyCapacity } from '../../_models/village/villageCrannyCapacity';
import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { controllerService } from '../../services/controllerService';
import { crannyInfoService } from '../../services/crannyInfoService';

export default <Resolvers>{
  Query: {
    activeVillageId: () => getAccountContext().villageService.currentVillageId,

    crannyCapacity: (_, args) => {
      const crannies = getAccountContext()
        .villageService.village(args.villageId)
        .buildings.spots.buildings()
        .filter((s) => s.type === BuildingType.Cranny);

      const emptyCapacity = new VillageCrannyCapacity();

      if (!crannies.length) {
        return emptyCapacity;
      }

      return crannies.reduce<VillageCrannyCapacity>((capacity, cranny) => {
        const actual = crannyInfoService.getCapacity(cranny.level.actual);
        const ongoing = crannyInfoService.getCapacity(
          cranny.level.getActualAndOngoing(),
        );
        const total = crannyInfoService.getCapacity(cranny.level.getTotal());

        return capacity.add(
          new VillageCrannyCapacity({
            actual,
            ongoing,
            total,
          }),
        );
      }, emptyCapacity);
    },

    village: (_, args) =>
      getAccountContext().villageService.village(args.villageId),

    villages: () => getAccountContext().villageService.allVillages(),
  },

  Mutation: {
    refreshVillage: (_, args) =>
      controllerService.requestVillageRefresh(args.villageId),
  },

  Subscription: {
    activeVillageIdChanged: subscribeToEvent(BotEvent.ActiveVillageIdChanged, {
      resolve: (p) => p.villageId,
    }),

    villageUpdated: subscribeToEvent(BotEvent.VillageUpdated, {
      filter: (p, args) => p.village.id === args.villageId,
      resolve: (p) => p.village,
    }),

    villagesUpdated: subscribeToEvent(BotEvent.VillagesUpdated, {
      resolve: (p) => p.villages,
    }),
  },
};
