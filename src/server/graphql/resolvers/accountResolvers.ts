import { IResolvers } from "../../_types/graphql";
import { accountService } from '../../services/accountService';

export const accountResolvers: IResolvers = {
  Query: {
    accounts: () => accountService.getAccounts(),

    account: (_, args) => accountService.getAccount(args.accountId),

    currentAccount: () => accountService.getCurrentAccount(),
  },

  Mutation: {
    createAccount: async (_, args) => {
      if (accountService.accountExists(args)) {
        return undefined;
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
    }
  },
};