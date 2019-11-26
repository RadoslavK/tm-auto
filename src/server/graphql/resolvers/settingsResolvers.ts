import { AutoAdventureSettings } from '../../_models/settings/tasks/AutoAdventureSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/AutoBuildSettings';
import { accountContext } from '../../accountContext';
import { AutoUnitsSettings } from '../../_models/settings/tasks/AutoUnitsSettings';
import { Resolvers } from './_types';
import { BuildingType } from '../../_enums/BuildingType';
import { GeneralVillageSettings } from '../../_models/settings/GeneralVillageSettings';
import { GeneralSettings } from '../../_models/settings/GeneralSettings';
import { AutoPartySettings } from '../../_models/settings/tasks/AutoPartySettings';
import { unitsService } from '../../services/unitsService';
import {
  IAutoUnitsBuildingSettings,
  IAutoUnitsSettings,
} from '../../_types/graphql';

export const settingsResolvers: Resolvers = {
  ITaskSettings: {
    __resolveType: (settings) => {
      if (settings instanceof AutoAdventureSettings) {
        return 'AutoAdventureSettings';
      }

      if (settings instanceof AutoBuildSettings) {
        return 'AutoBuildSettings';
      }

      if (settings instanceof AutoUnitsSettings) {
        return 'AutoUnitsSettings';
      }

      if (settings instanceof AutoPartySettings) {
        return 'AutoPartySettings';
      }

      return null;
    },
  },
  Query: {
    generalSettings: () => accountContext.settingsService.general.get(),
    hero: () => accountContext.settingsService.hero.get(),
    generalVillageSettings: (_, args) => accountContext.settingsService.village(args.villageId).general.get(),
    autoBuildSettings: (_, args) => accountContext.settingsService.village(args.villageId).autoBuild.get(),
    autoUnitsSettings: (_, args) => accountContext.settingsService.village(args.villageId).autoUnits.get(),
  },

  Mutation: {
    updateGeneralSettings: (_, args) => {
      const updatedSettings = new GeneralSettings(args.input.settings);

      accountContext.settingsService.general.update(updatedSettings);
      return true;
    },

    updateAutoBuildVillageSettings: (_, args) => {
      const {
        villageId,
        settings,
      } = args.input;

      const updatedSettings = new AutoBuildSettings(settings);

      accountContext.settingsService.village(villageId).autoBuild.update(updatedSettings);
      return true;
    },

    updateGeneralVillageSettings: (_, args) => {
      const {
        villageId,
        settings,
      } = args.input;

      const updatedSettings = new GeneralVillageSettings(settings);

      accountContext.settingsService.village(villageId).general.update(updatedSettings);
      return true;
    },

    updateAutoAdventureSettings: (_, args) => {
      const {
        settings,
      } = args.input;

      const updatedSettings = new AutoAdventureSettings(settings);

      accountContext.settingsService.hero.autoAdventure.update(updatedSettings);
      return true;
    },

    updateAutoUnitsUnitSettings: (_, args) => {
      const {
        villageId,
        unitIndex,
        ...updatedUnitSettings
      } = args.input;

      const settingsManager = accountContext.settingsService.village(villageId).autoUnits;
      const settings = settingsManager.get();

      const unitInfo = unitsService.getUnitInfo(unitIndex);
      const buildingSettings = settings.forBuilding(unitInfo.buildingType);

      const collectionIndex = buildingSettings.units.findIndex(u => u.index === unitIndex);
      buildingSettings.units[collectionIndex] = {
        ...updatedUnitSettings,
        index: unitIndex,
      };

      const updatedSettings: AutoUnitsSettings = new AutoUnitsSettings({
        ...settings,
      });

      settingsManager.update(updatedSettings);

      return true;
    },

    updateAutoUnitsBuildingSettings: (_, args) => {
      const {
        buildingType,
        villageId,
        allow,
        maxBuildTime,
      } = args.input;

      const settingsManager = accountContext.settingsService.village(villageId).autoUnits;
      const settings = settingsManager.get();

      const buildingSettings = settings.forBuilding(buildingType);

      const updatedBuildingSettings: IAutoUnitsBuildingSettings = {
        ...buildingSettings,
        allow,
        maxBuildTime,
      };

      const getUpdatedSettings = (): IAutoUnitsSettings => {
        switch (buildingType) {
          case BuildingType.Barracks:
            return { ...settings, barracks: updatedBuildingSettings };

          case BuildingType.Stable:
            return { ...settings, stable: updatedBuildingSettings };

          case BuildingType.Workshop:
            return { ...settings, workshop: updatedBuildingSettings };

          case BuildingType.Residence:
            return { ...settings, residence: updatedBuildingSettings };

          default:
            throw new Error(`Unknown building type: ${buildingType}`);
        }
      };

      settingsManager.update(new AutoUnitsSettings(getUpdatedSettings()));

      return true;
    },

    updateAutoUnitsSettings: (_, args) => {
      const {
        villageId,
        ...modifiedSettings
      } = args.input;

      const settingsManager = accountContext.settingsService.village(villageId).autoUnits;
      const settings = settingsManager.get();

      const updatedSettings = new AutoUnitsSettings({
        ...settings,
        ...modifiedSettings,
      });

      settingsManager.update(updatedSettings);

      return true;
    },

    resetGeneralSettings: () => {
      const settingsManager = accountContext.settingsService.general;
      settingsManager.update(new GeneralSettings());
      return true;
    },

    resetAutoAdventureSettings: () => {
      const settingsManager = accountContext.settingsService.hero.autoAdventure;
      settingsManager.update(new AutoAdventureSettings());
      return true;
    },

    resetGeneralVillageSettings: (_, args) => {
      const settingsManager = accountContext.settingsService.village(args.input.villageId).general;
      settingsManager.update(new GeneralVillageSettings());
      return true;
    },

    resetAutoBuildSettings: (_, args) => {
      const settingsManager = accountContext.settingsService.village(args.input.villageId).autoBuild;
      settingsManager.update(new AutoBuildSettings());
      return true;
    },

    resetAutoUnitsSettings: (_, args) => {
      const settingsManager = accountContext.settingsService.village(args.input.villageId).autoUnits;
      settingsManager.update(new AutoUnitsSettings());
      return true;
    },
  },
};
