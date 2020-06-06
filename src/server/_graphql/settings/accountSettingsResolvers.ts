import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';

export default <Resolvers>{
  Query: {
    accountSettings: () => getAccountContext().settingsService.account.get(),
  },

  Mutation: {
    updateAccountSettings: (_, args) => getAccountContext().settingsService.account.merge(args.settings),
    resetAccountSettings: () => getAccountContext().settingsService.account.reset(),
  },
};