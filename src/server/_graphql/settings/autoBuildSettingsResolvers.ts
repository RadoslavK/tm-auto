import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';

const getService = (villageId: number) => accountContext.settingsService.village(villageId).autoBuild;

export default <Resolvers> {
  Query: {
    autoBuildSettings: (_, args) => getService(args.villageId).get(),
  },

  Mutation: {
    updateAutoBuildSettings: (_, args) => getService(args.villageId).merge(args.settings),
    resetAutoBuildSettings: (_, args) => getService(args.villageId).reset(),
  },
};