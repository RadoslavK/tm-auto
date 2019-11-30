import { accountService } from '../../services/accountService';
import { Resolvers } from './_types';

export const accountResolvers: Resolvers = {
  Query: {
    accounts: () => accountService.getAccounts(),

    account: (_, args) => accountService.getAccount(args.accountId),

    currentAccount: () => accountService.getCurrentAccount(),

    lastSignedAccountId: () => accountService.lastSignedAccountId(),
  },

  Mutation: {
    createAccount: async (_, args) => {
      if (accountService.accountExists(args)) {
        return null;
      }

      const newAcc = await accountService.createAccount(args);
      return newAcc.id;
    },

    updateAccount: async (_, args) => {
      if (accountService.accountExists(args)) {
        return false;
      }

      await accountService.updateAccount(args);
      return true;
    },

    deleteAccount: async (_, args) => {
      accountService.deleteAccount(args.accountId);
      return true;
    },
  },
};
