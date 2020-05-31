import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';

const getService = (villageId: number) => accountContext.settingsService.village(villageId).autoParty;

export default <Resolvers> {
  Query: {
    autoPartySettings: (_, args) => getService(args.villageId).get(),
  },

  Mutation: {
    updateAutoPartySettings: (_, args) => getService(args.villageId).merge(args.settings),
    resetAutoPartySettings: (_, args) => getService(args.villageId).reset(),
  },
};