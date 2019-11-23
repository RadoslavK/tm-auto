import {
  IResolvers,
} from '../../_types/graphql';
import { mapCoolDown } from '../mappers/settings/mapCoolDown';
import { AutoAdventureSettings } from '../../_models/settings/tasks/AutoAdventureSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/AutoBuildSettings';
import { accountContext } from '../../accountContext';

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
    generalSettings: () => accountContext.settingsService.general.get(),
    hero: () => accountContext.settingsService.hero.get(),
    villageSettings: (_, args) => accountContext.settingsService.village(args.villageId).get(),
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
  },
};
