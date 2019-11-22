import {
  IResolvers,
} from '../../_types/graphql';
import { mapCoolDown } from '../mappers/settings/mapCoolDown';
import { AutoAdventureSettings } from '../../_models/settings/tasks/AutoAdventureSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/AutoBuildSettings';
import { SettingsService } from '../../services/settings';

export const settingsResolvers: IResolvers = {
  ITaskSettings: {
    __resolveType: (settings) => {
      if (settings instanceof AutoAdventureSettings) {
        return 'AutoAdventureSettings';
      }

      if (settings instanceof AutoBuildSettings) {
        return 'AutoBuildSettings';
      }

      return undefined;
    },
  },
  Query: {
    generalSettings: () => SettingsService.instance().general.get(),
    hero: () => SettingsService.instance().hero.get(),
    villageSettings: (_, args) => SettingsService.instance().village(args.villageId).get(),
  },

  Mutation: {
    updateGeneralSettings: (_, args) => {
      SettingsService.instance().general.update(args.input.settings);
      return true;
    },

    updateAutoBuildVillageSettings: (_, args) => {
      const {
        villageId,
        settings,
      } = args.input;

      SettingsService.instance().village(villageId).autoBuild.update({
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

      SettingsService.instance().village(villageId).general.update(settings);
      return true;
    },

    updateAutoAdventureSettings: (_, args) => {
      const {
        settings,
      } = args.input;

      SettingsService.instance().hero.autoAdventure.update({
        ...settings,
        coolDown: mapCoolDown(settings.coolDown),
      });
      return true;
    },
  },
};
