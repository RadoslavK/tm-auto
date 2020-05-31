import { Resolvers } from '../../_types/resolvers.type';
import { accountService } from '../../services/accountService';

export default <Resolvers>{
  Query: {
    account: (_, args) => accountService.getAccount(args.accountId),

    accounts: () => accountService.getAccounts(),

    currentAccount: () => accountService.getCurrentAccount(),

    lastSignedAccountId: () => accountService.lastSignedAccountId(),
  },

  Mutation: {
    createAccount: async (_, args) => {
      if (accountService.accountExists(args.account)) {
        return null;
      }

      const newAcc = await accountService.createAccount(args.account);
      return newAcc.id;
    },

    deleteAccount: async (_, args) => {
      accountService.deleteAccount(args.accountId);
      return true;
    },

    updateAccount: async (_, args) => {
      if (accountService.accountExists(args.account)) {
        return false;
      }

      await accountService.updateAccount(args.account);
      return true;
    },
  },
};