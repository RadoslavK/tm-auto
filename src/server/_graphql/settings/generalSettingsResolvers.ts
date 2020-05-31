import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';

export default <Resolvers>{
  Query: {
    generalSettings: () => accountContext.settingsService.general.get(),
  },

  Mutation: {
    updateGeneralSettings: (_, args) => accountContext.settingsService.general.merge(args.settings),
    resetGeneralSettings: () => accountContext.settingsService.general.reset(),
  },
};