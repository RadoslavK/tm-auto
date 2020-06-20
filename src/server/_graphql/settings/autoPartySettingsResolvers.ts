import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';

const getService = (villageId: string) =>
  getAccountContext().settingsService.village(villageId).autoParty;

export default <Resolvers>{
  Query: {
    autoPartySettings: (_, args) => getService(args.villageId).get(),
  },

  Mutation: {
    updateAutoPartySettings: (_, args) =>
      getService(args.villageId).merge(args.settings),
    resetAutoPartySettings: (_, args) => getService(args.villageId).reset(),
  },
};
