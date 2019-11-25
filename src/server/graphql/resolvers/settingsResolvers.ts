import { mapCoolDown } from '../mappers/settings/mapCoolDown';
import { AutoAdventureSettings } from '../../_models/settings/tasks/AutoAdventureSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/AutoBuildSettings';
import { accountContext } from '../../accountContext';
import {
  AutoUnitsSettings,
  AutoUnitsUnitSettings,
} from '../../_models/settings/tasks/AutoUnitsSettings';
import { Resolvers } from './_types';
import { mapAutoUnitsSettings } from '../mappers/settings/mapAutoUnitsSettings';
import { BuildingType } from '../../_enums/BuildingType';

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

      return null;
    },
  },
  Query: {
    generalSettings: () => accountContext.settingsService.general.get(),
    hero: () => accountContext.settingsService.hero.get(),
    villageSettings: (_, args) => {
      const villageSettings = accountContext.settingsService.village(args.villageId).get();

      return {
        general: villageSettings.general,
        autoBuild: villageSettings.autoBuild,
        autoUnits: mapAutoUnitsSettings(villageSettings.autoUnits),
      };
    },
    autoUnitsSettings: (_, args) => mapAutoUnitsSettings(accountContext.settingsService.village(args.villageId).autoUnits.get()),
  },

  Mutation: {
    updateGeneralSettings: (_, args) => {
      accountContext.settingsService.general.update(args.input.settings);
      return true;
    },

    updateAutoBuildVillageSettings: (_, args) => {
      const {
        villageId,
        settings,
      } = args.input;

      accountContext.settingsService.village(villageId).autoBuild.update({
        ...settings,
        coolDown: mapCoolDown(settings.coolDown),
      });
      return true;
    },

    updateGeneralVillageSettings: (_, args) => {
      const {
        villageId,
        settings,
      } = args.input;

      accountContext.settingsService.village(villageId).general.update(settings);
      return true;
    },

    updateAutoAdventureSettings: (_, args) => {
      const {
        settings,
      } = args.input;

      accountContext.settingsService.hero.autoAdventure.update({
        ...settings,
        coolDown: mapCoolDown(settings.coolDown),
      });
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

      const updatedUnits = [...settings.units];
      updatedUnits[unitIndex - 1] = new AutoUnitsUnitSettings({
        ...updatedUnitSettings,
        index: unitIndex,
      });

      const updatedSettings: AutoUnitsSettings = new AutoUnitsSettings({
        ...settings,
        units: updatedUnits,
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

      const updatedBuildings = { ...settings.buildings };

      updatedBuildings[buildingType as BuildingType] = {
        allow,
        maxBuildTime,
      };

      const updatedSettings = new AutoUnitsSettings({
        ...settings,
        buildings: updatedBuildings,
      });

      settingsManager.update(updatedSettings);

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
        coolDown: mapCoolDown(modifiedSettings.coolDown),
      });

      settingsManager.update(updatedSettings);

      return true;
    }
  },
};
