import { VillageCrannyCapacity } from '../../_models/village/villageCrannyCapacity';
import { Resolvers } from '../../_types/resolvers.type';
import { BuildingType } from '../../../_shared/types/buildingType';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { crannyInfoService } from '../../services/crannyInfoService';

export default <Resolvers>{
  Query: {
    activeVillageId: () => accountContext.villageService.currentVillageId,

    crannyCapacity: (_, args) => {
      const crannies = accountContext.villageService.village(args.villageId).buildings.spots.buildings().filter(s => s.type === BuildingType.Cranny);

      const emptyCapacity = new VillageCrannyCapacity();

      if (!crannies.length) {
        return emptyCapacity;
      }

      return crannies
        .reduce<VillageCrannyCapacity>(
          (capacity, cranny) => {
            const actual = crannyInfoService.getCapacity(cranny.level.actual);
            const ongoing = crannyInfoService.getCapacity(cranny.level.actual + cranny.level.ongoing);
            const total = crannyInfoService.getCapacity(cranny.level.getTotal());

            return capacity.add(new VillageCrannyCapacity({
              actual,
              ongoing,
              total,
            }));
          },
          emptyCapacity,
        );
    },

    village: (_, args) => accountContext.villageService.village(args.villageId),

    villages: () => accountContext.villageService.allVillages(),
  },

  Subscription: {
    activeVillageIdChanged: subscribeToEvent(BotEvent.ActiveVillageIdChanged, {
      resolve: p => p.villageId,
    }),

    villageUpdated: subscribeToEvent(BotEvent.VillageUpdated, {
      resolve: p => p.village,
    }),

    villagesUpdated: subscribeToEvent(BotEvent.VillagesUpdated, {
      resolve: p => p.villages,
    }),
  },
};