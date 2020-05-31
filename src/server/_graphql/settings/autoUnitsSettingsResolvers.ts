import { Resolvers } from '../../_types/resolvers.type';
import { mergeDefaults } from '../../../_shared/merge';
import { accountContext } from '../../accountContext';
import { unitInfoService } from '../../services/info/unitInfoService';

const getService = (villageId: number) => accountContext.settingsService.village(villageId).autoUnits;

export default <Resolvers> {
  Query: {
    autoUnitsSettings: (_, args) => getService(args.villageId).get(),
  },

  Mutation: {
    updateAutoUnitsSettings: (_, args) => getService(args.villageId).merge(args.settings),

    updateAutoUnitsBuildingSettings: (_, args) => {
      const service = getService(args.villageId);
      const settings = service.get();
      const buildingSettings = settings.forBuilding(args.buildingType);

      mergeDefaults(buildingSettings, args.settings);
      service.update(settings);

      return buildingSettings;
    },

    updateAutoUnitsUnitSettings: (_, args) => {
      const service = getService(args.villageId);
      const settings = service.get();
      const unitInfo = unitInfoService.getUnitInfo(args.settings.index);
      const buildingSettings = settings.forBuilding(unitInfo.buildingType);
      const unitSettings = buildingSettings.units.find(u => u.index === args.settings.index);

      mergeDefaults(unitSettings, args.settings);
      service.update(settings);

      return unitSettings;
    },

    resetAutoUnitsSettings: (_, args) => getService(args.villageId).reset(),
  },
};