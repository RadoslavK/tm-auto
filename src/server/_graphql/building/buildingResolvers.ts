import { AvailableNewBuilding } from '../../_types/graphql.type';
import { Resolvers } from '../../_types/resolvers.type';
import { BuildingType } from '../../../_shared/types/buildingType';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { AvailableBuildingTypesService } from '../../services/availableBuildingTypesService';
import { buildingInfoService } from '../../services/info/buildingInfoService';

const getBuildingSpots = (villageId: number) => {
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
    level: spot => ({
      ...spot.level,
      total: spot.level.getTotal(),
      max: buildingInfoService.getBuildingInfo(spot.type).maxLevel,
    }),
    name: spot => buildingInfoService.getBuildingInfo(spot.type).name,
  },

  Query: {
    availableNewBuildings: (_, args) => {
      const {
        fieldId,
        villageId,
      } = args.input;

      const manager = new AvailableBuildingTypesService(villageId);
      return manager.availableBuildingTypes(fieldId).map((type): AvailableNewBuilding => ({
        name: buildingInfoService.getBuildingInfo(type).name,
        type,
      }));
    },

    buildingSpots: (_, args) => getBuildingSpots(args.villageId),

    maxBuildingLevel: (_, args) => buildingInfoService.getBuildingInfo(args.buildingType).maxLevel,
  },

  Subscription: {
    actualBuildingLevelsUpdate: subscribeToEvent(BotEvent.ActualBuildingLevelsUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: () => true,
    }),
  },
};