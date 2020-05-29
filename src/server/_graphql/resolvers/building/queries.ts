import { Resolvers } from '../../_types';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { accountContext } from '../../../accountContext';
import { AvailableBuildingTypesService } from '../../../services/availableBuildingTypesService';
import { buildingInfoService } from '../../../services/info/buildingInfoService';
import { AvailableNewBuilding } from '../../graphql.type';

export default <Resolvers>{
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

    buildingSpots: (_, args) => {
      const { villageId } = args;
      const normalizedSpots = accountContext.villageService.village(villageId).buildings.normalizedBuildingSpots();

      return {
        infrastructure: normalizedSpots.filter(s => s.fieldId >= 19),
        resources: {
          clay: normalizedSpots.filter(s => s.type === BuildingType.Clay),
          crop: normalizedSpots.filter(s => s.type === BuildingType.Crop),
          iron: normalizedSpots.filter(s => s.type === BuildingType.Iron),
          wood: normalizedSpots.filter(s => s.type === BuildingType.Wood),
        },
      };
    },

    maxBuildingLevel: (_, args) => buildingInfoService.getBuildingInfo(args.buildingType).maxLevel,
  },
};