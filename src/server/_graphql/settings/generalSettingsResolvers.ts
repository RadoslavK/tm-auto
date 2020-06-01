import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';

export default <Resolvers>{
  Query: {
    generalSettings: () => getAccountContext().settingsService.general.get(),
  },

  Mutation: {
    updateGeneralSettings: (_, args) => getAccountContext().settingsService.general.merge(args.settings),
    resetGeneralSettings: () => getAccountContext().settingsService.general.reset(),
  },
};