import { Resolvers } from '../../_types';
import { accountService } from '../../../services/accountService';

export default <Resolvers>{
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
};