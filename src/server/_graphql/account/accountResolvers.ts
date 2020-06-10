import { Resolvers } from '../../_types/resolvers.type';
import { accountService } from '../../services/accountService';

export default <Resolvers>{
  Query: {
    account: (_, args) => accountService.getAccount(args.id),
    accounts: () => accountService.getAccounts(),
    currentAccount: () => accountService.getCurrentAccount(),
    isAccountTaken: (_, args) => accountService.isAccountTaken(args.account),
    lastSignedAccountId: () => accountService.lastSignedAccountId(),
  },

  Mutation: {
    createAccount: (_, args) => accountService.createAccount(args.account),
    deleteAccount: (_, args) => accountService.deleteAccount(args.id),
    updateAccount: (_, { account, id }) => accountService.updateAccount({ ...account, id }),
  },
};