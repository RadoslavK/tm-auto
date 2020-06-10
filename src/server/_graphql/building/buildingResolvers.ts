import { BuildingSpotLevel } from '../../_types/graphql.type';
import { Resolvers } from '../../_types/resolvers.type';
import { BuildingType } from '../../../_shared/types/buildingType';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { AvailableBuildingTypesService } from '../../services/availableBuildingTypesService';
import { buildingInfoService } from '../../services/info/buildingInfoService';

const getBuildingSpots = (villageId: string) => {
  const normalizedSpots = getAccountContext().villageService.village(villageId).buildings.spots.buildings();

  return {
    infrastructure: normalizedSpots.filter(s => s.fieldId >= 19),
    resources: {
      clay: normalizedSpots.filter(s => s.type === BuildingType.Clay),
      crop: normalizedSpots.filter(s => s.type === BuildingType.Crop),
      iron: normalizedSpots.filter(s => s.type === BuildingType.Iron),
      wood: normalizedSpots.filter(s => s.type === BuildingType.Wood),
    },
  };
};

export default <Resolvers> {
  BuildingSpot: {
    level: (spot): BuildingSpotLevel => ({
      ...spot.level,
      total: spot.level.getTotal(),
    }),
  },

  Query: {
    availableNewBuildingsTypes: (_, args) => {
      const {
        fieldId,
        villageId,
      } = args.input;

      const manager = new AvailableBuildingTypesService(villageId);
      return manager.availableBuildingTypes(fieldId);
    },

    buildingSpots: (_, args) => getBuildingSpots(args.villageId),

    buildingInfo: (_, args) => {
      const info = buildingInfoService.getBuildingInfo(args.buildingType);

      return {
        ...info,
        costs: Object.values(info.costs),
      };
    },
  },

  Subscription: {
    actualBuildingLevelsUpdated: subscribeToEvent(BotEvent.ActualBuildingLevelsUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: () => {},
    }),
  },
};