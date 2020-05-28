import { Resolvers } from '../../_types';
import { VillageCrannyCapacity } from '../../../_models/village/villageCrannyCapacity';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { accountContext } from '../../../accountContext';
import { crannyInfoService } from '../../../services/crannyInfoService';
import { mapVillage } from '../../mappers/villageMappers';

export default <Resolvers>{
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
};