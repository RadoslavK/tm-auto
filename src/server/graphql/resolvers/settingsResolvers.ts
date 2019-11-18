import {
  IAutoAdventureSettings,
  IAutoBuildSettings,
  IResolvers,
} from '../../_types/graphql';
import { settingsService } from '../../services/settingsService';
import { mapCoolDown } from '../mappers/settings/mapCoolDown';
import { AutoAdventureSettings } from '../../_models/settings/tasks/AutoAdventureSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/AutoBuildSettings';

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
    generalSettings: () => settingsService.get().general,
    hero: () => settingsService.get().hero,
    villageSettings: (_, args) => settingsService.get().village(args.villageId),
  },

  Mutation: {
    updateGeneralSettings: (_, args) => {
      settingsService.general.update(args.input.settings);
      return true;
    },

    updateAutoBuildVillageSettings: (_, args) => {
      const {
        villageId,
        settings,
      } = args.input;

      settingsService.village(villageId).autoBuild.update({
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

      settingsService.village(villageId).general.update(settings);
      return true;
    },

    updateAutoAdventureSettings: (_, args) => {
      const {
        settings,
      } = args.input;

      settingsService.hero.autoAdventure.update({
        ...settings,
        coolDown: mapCoolDown(settings.coolDown),
      });
      return true;
    },
  },
};
