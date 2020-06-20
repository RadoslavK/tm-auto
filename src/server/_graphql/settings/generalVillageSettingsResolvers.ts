import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';

const getService = (villageId: string) =>
  getAccountContext().settingsService.village(villageId).general;

export default <Resolvers>{
  Query: {
    generalVillageSettings: (_, args) => getService(args.villageId).get(),
  },

  Mutation: {
    updateGeneralVillageSettings: (_, args) =>
      getService(args.villageId).merge(args.settings),
    resetGeneralVillageSettings: (_, args) =>
      getService(args.villageId).reset(),
  },
};
