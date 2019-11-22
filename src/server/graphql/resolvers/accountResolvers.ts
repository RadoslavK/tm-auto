import { IResolvers } from "../../_types/graphql";
import { accountService } from '../../services/accountService';

export const accountResolvers: IResolvers = {
  Query: {
    accounts: () => accountService.getAccounts(),
  },

  Mutation: {
    createAccount: async (_, args) => {
      const newAcc = await accountService.createAccount(args);
      return newAcc.id;
    },

    updateAccount: async (_, args) => {
      accountService.updateAccount(args);
      return true;
    },
  },
};