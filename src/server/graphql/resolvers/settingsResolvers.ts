import { GeneralSettings } from '../../_models/settings/generalSettings';
import { GeneralVillageSettings } from '../../_models/settings/generalVillageSettings';
import { AutoAdventureSettings } from '../../_models/settings/tasks/autoAdventureSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../../_models/settings/tasks/autoPartySettings';
import { AutoUnitsSettings } from '../../_models/settings/tasks/autoUnitsSettings';
import {
  IAutoUnitsBuildingSettings,
  IAutoUnitsSettings,
  SettingsType,
  VillageSettingsType,
} from '../../_types/graphql';
import { BuildingType } from '../../../_shared/types/buildingType';
import { accountContext } from '../../accountContext';
import { unitsService } from '../../services/unitsService';
import { BotEvent } from '../subscriptions/botEvent';
import {
  publishPayloadEvent,
  subscribeToEvent,
} from '../subscriptions/pubSub';
import { Resolvers } from './_types';

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
      const updatedSettings = new GeneralSettings(args.settings);

      accountContext.settingsService.general.update(updatedSettings);
      return true;
    },

    updateAutoBuildVillageSettings: (_, args) => {
      const {
        villageId,
        ...settings
      } = args.settings;

      const updatedSettings = new AutoBuildSettings(settings);

      accountContext.settingsService.village(villageId).autoBuild.update(updatedSettings);
      return true;
    },

    updateGeneralVillageSettings: (_, args) => {
      const {
        villageId,
        ...settings
      } = args.settings;

      const updatedSettings = new GeneralVillageSettings(settings);

      accountContext.settingsService.village(villageId).general.update(updatedSettings);
      return true;
    },

    updateAutoAdventureSettings: (_, args) => {
      const {
        settings,
      } = args;

      const updatedSettings = new AutoAdventureSettings(settings);

      accountContext.settingsService.hero.autoAdventure.update(updatedSettings);
      return true;
    },

    updateAutoUnitsUnitSettings: (_, args) => {
      const {
        villageId,
        unitIndex,
        ...updatedUnitSettings
      } = args.settings;

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
      } = args.settings;

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
      } = args.settings;

      const settingsManager = accountContext.settingsService.village(villageId).autoUnits;
      const settings = settingsManager.get();

      const updatedSettings = new AutoUnitsSettings({
        ...settings,
        ...modifiedSettings,
      });

      settingsManager.update(updatedSettings);

      return true;
    },

    resetSettings: async (_, args): Promise<boolean> => {
      switch (args.type) {
        case SettingsType.General: {
          const settings = new GeneralSettings();
          await accountContext.settingsService.general.update(settings);
          await publishPayloadEvent(BotEvent.GeneralSettingsChanged, { settings });
          break;
        }

        case SettingsType.AutoAdventure: {
          const settings = new AutoAdventureSettings();
          await accountContext.settingsService.hero.autoAdventure.update(settings);
          await publishPayloadEvent(BotEvent.AutoAdventureSettingsChanged, { settings });
          break;
        }

        default:
          throw new Error(`Invalid settings type: ${SettingsType[args.type]}`);
      }

      return true;
    },

    resetVillageSettings: async (_, { type, villageId }): Promise<boolean> => {
      switch (type) {
        case VillageSettingsType.General: {
          const settings = new GeneralVillageSettings();
          await accountContext.settingsService.village(villageId).general.update(settings);
          await publishPayloadEvent(BotEvent.GeneralVillageSettingsChanged, { villageId, settings });
          break;
        }

        case VillageSettingsType.AutoBuild: {
          const settings = new AutoBuildSettings();
          await accountContext.settingsService.village(villageId).autoBuild.update(settings);
          await publishPayloadEvent(BotEvent.AutoBuildSettingsChanged, { villageId, settings });
          break;
        }

        case VillageSettingsType.AutoUnits: {
          const settings = new AutoUnitsSettings();
          await accountContext.settingsService.village(villageId).autoUnits.update(settings);
          await publishPayloadEvent(BotEvent.AutoUnitsSettingsChanged, { villageId, settings });
          break;
        }

        default:
          throw new Error(`Invalid village settings type: ${VillageSettingsType[type]}`);
      }

      return true;
    },
  },

  Subscription: {
    generalSettingsChanged: subscribeToEvent(BotEvent.GeneralSettingsChanged, {
      resolve: payload => payload.settings,
    }),

    autoAdventureSettingsChanged: subscribeToEvent(BotEvent.AutoAdventureSettingsChanged, {
      resolve: payload => payload.settings,
    }),

    generalVillageSettingsChanged: subscribeToEvent(BotEvent.GeneralVillageSettingsChanged, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: payload => payload.settings,
    }),

    autoBuildSettingsChanged: subscribeToEvent(BotEvent.AutoBuildSettingsChanged, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: payload => payload.settings,
    }),

    autoUnitsSettingsChanged: subscribeToEvent(BotEvent.AutoUnitsSettingsChanged, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: payload => payload.settings,
    }),
  },
};
