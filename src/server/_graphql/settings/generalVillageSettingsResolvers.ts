import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';

const getService = (villageId: number) => accountContext.settingsService.village(villageId).general;

export default <Resolvers> {
  Query: {
    generalVillageSettings: (_, args) => getService(args.villageId).get(),
  },

  Mutation: {
    updateGeneralVillageSettings: (_, args) => getService(args.villageId).merge(args.settings),
    resetGeneralVillageSettings: (_, args) => getService(args.villageId).reset(),
  },
};