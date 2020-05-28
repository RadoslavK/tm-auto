import { Resolvers } from '../../_types';
import { GeneralSettings } from '../../../_models/settings/generalSettings';
import { GeneralVillageSettings } from '../../../_models/settings/generalVillageSettings';
import { AutoAdventureSettings } from '../../../_models/settings/tasks/autoAdventureSettings';
import { AutoBuildSettings } from '../../../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../../../_models/settings/tasks/autoPartySettings';
import {
  AutoUnitsBuildingSettings,
  AutoUnitsSettings,
  AutoUnitsUnitSettings,
} from '../../../_models/settings/tasks/autoUnitsSettings';
import { BuildingType } from '../../../../_shared/types/buildingType';
import {
  SettingsType,
  VillageSettingsType,
} from '../../../../_shared/types/settingsType';
import { accountContext } from '../../../accountContext';
import { BotEvent } from '../../../events/botEvent';
import { unitInfoService } from '../../../services/info/unitInfoService';
import { publishPayloadEvent } from '../../pubSub';

export default <Resolvers>{
  Mutation: {
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
          await publishPayloadEvent(BotEvent.GeneralVillageSettingsChanged, { settings, villageId });
          break;
        }

        case VillageSettingsType.AutoBuild: {
          const settings = new AutoBuildSettings();
          await accountContext.settingsService.village(villageId).autoBuild.update(settings);
          await publishPayloadEvent(BotEvent.AutoBuildSettingsChanged, { settings, villageId });
          break;
        }

        case VillageSettingsType.AutoUnits: {
          const settings = new AutoUnitsSettings();
          await accountContext.settingsService.village(villageId).autoUnits.update(settings);
          await publishPayloadEvent(BotEvent.AutoUnitsSettingsChanged, { settings, villageId });
          break;
        }

        case VillageSettingsType.AutoParty: {
          const settings = new AutoPartySettings();
          await accountContext.settingsService.village(villageId).autoParty.update(settings);
          await publishPayloadEvent(BotEvent.AutoPartySettingsChanged, { settings, villageId });
          break;
        }

        default:
          throw new Error(`Invalid village settings type: ${VillageSettingsType[type]}`);
      }

      return true;
    },

    updateAutoAdventureSettings: (_, args) => {
      const {
        settings,
      } = args;

      accountContext.settingsService.hero.autoAdventure.update(new AutoAdventureSettings(settings));
      return true;
    },

    updateAutoBuildVillageSettings: (_, args) => {
      const {
        allowAutoGranary,
        allowAutoWarehouse,
        allowFreeSpots,
        autoGranaryOverflowLevel,
        autoWarehouseOverflowLevel,
        villageId,
        ...settings
      } = args.settings;

      const updatedSettings = new AutoBuildSettings({
        ...settings,
        autoStorage: {
          allowFreeSpots,
          granary: {
            allow: allowAutoGranary,
            overflowLevel: autoGranaryOverflowLevel,
          },
          warehouse: {
            allow: allowAutoWarehouse,
            overflowLevel: autoWarehouseOverflowLevel,
          },
        },
      });

      accountContext.settingsService.village(villageId).autoBuild.update(updatedSettings);
      return true;
    },

    updateAutoPartySettings: (_, args) => {
      const {
        villageId,
        ...modifiedSettings
      } = args.settings;

      const settingsManager = accountContext.settingsService.village(villageId).autoParty;
      const settings = settingsManager.get();

      const updatedSettings = new AutoPartySettings({
        ...settings,
        ...modifiedSettings,
      });

      settingsManager.update(updatedSettings);

      return true;
    },

    updateAutoUnitsBuildingSettings: (_, args) => {
      const {
        allow,
        buildingType,
        maxBuildTime,
        villageId,
      } = args.settings;

      const settingsManager = accountContext.settingsService.village(villageId).autoUnits;
      const settings = settingsManager.get();

      const buildingSettings = settings.forBuilding(buildingType);

      const updatedBuildingSettings = new AutoUnitsBuildingSettings({
        ...buildingSettings,
        allow,
        maxBuildTime,
      });

      const getUpdatedSettings = (): AutoUnitsSettings => {
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

    updateAutoUnitsUnitSettings: (_, args) => {
      const {
        unitIndex,
        villageId,
        ...updatedUnitSettings
      } = args.settings;

      const settingsManager = accountContext.settingsService.village(villageId).autoUnits;
      const settings = settingsManager.get();

      const unitInfo = unitInfoService.getUnitInfo(unitIndex);
      const buildingSettings = settings.forBuilding(unitInfo.buildingType);

      const collectionIndex = buildingSettings.units.findIndex(u => u.index === unitIndex);
      buildingSettings.units[collectionIndex] = new AutoUnitsUnitSettings({
        ...updatedUnitSettings,
        index: unitIndex,
      });

      settingsManager.update(settings);

      return true;
    },

    updateGeneralSettings: (_, args) => {
      accountContext.settingsService.general.update(new GeneralSettings(args.settings));
      return true;
    },

    updateGeneralVillageSettings: (_, args) => {
      const {
        villageId,
        ...settings
      } = args.settings;

      accountContext.settingsService.village(villageId).general.update(new GeneralVillageSettings(settings));
      return true;
    },
  },
};