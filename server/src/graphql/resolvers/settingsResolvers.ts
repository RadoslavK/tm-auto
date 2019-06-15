import { IResolvers } from '../../_types/graphql';
import { context } from '../context';

export const settingsResolvers: IResolvers = {
  Query: {
    generalSettings: () => context.settings.general,
    hero: () => context.settings.hero,
    villageSettings: (_, args) => context.settings.village(args.villageId),
  },

  Mutation: {
    updateGeneralSettings: (_, args) => {
      context.settings.general = args.input.settings;
      return true;
    },

    updateAutoBuildVillageSettings: (_, args) => {
      const {
        villageId,
        settings,
      } = args.input;

      context.settings.village(villageId).autoBuild = settings;
      return true;
    },

    updateGeneralVillageSettings: (_, args) => {
      const {
        villageId,
        settings,
      } = args.input;

      context.settings.village(villageId).general = settings;
      return true;
    },

    updateAutoAdventureSettings: (_, args) => {
      const {
        settings,
      } = args.input;

      context.settings.hero.autoAdventure = settings;
      return true;
    },
  },
};
