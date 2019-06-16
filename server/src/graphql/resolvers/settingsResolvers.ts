import { IResolvers } from '../../_types/graphql';
import { settingsService } from '../../services/settingsService';
import { context } from '../context';
import set = Reflect.set;

export const settingsResolvers: IResolvers = {
  Query: {
    generalSettings: () => context.settings.general,
    hero: () => context.settings.hero,
    villageSettings: (_, args) => context.settings.village(args.villageId),
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

      settingsService.village(villageId).autoBuild.update(settings);
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

      settingsService.hero.autoAdventure.update(settings);
      return true;
    },
  },
};
