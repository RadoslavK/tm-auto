import { accountService } from '../../services/accountService';
import { Resolvers } from './_types';

export const accountResolvers: Resolvers = {
  Mutation: {
    createAccount: async (_, args) => {
      if (accountService.accountExists(args)) {
        return null;
      }

      const newAcc = await accountService.createAccount(args);
      return newAcc.id;
    },

    deleteAccount: async (_, args) => {
      accountService.deleteAccount(args.accountId);
      return true;
    },

    updateAccount: async (_, args) => {
      if (accountService.accountExists(args)) {
        return false;
      }

      await accountService.updateAccount(args);
      return true;
    },
  },

  Query: {
    account: (_, args) => accountService.getAccount(args.accountId),

    accounts: () => accountService.getAccounts(),

    currentAccount: () => accountService.getCurrentAccount(),

    lastSignedAccountId: () => accountService.lastSignedAccountId(),
  },
};
