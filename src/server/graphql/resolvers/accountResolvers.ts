import { IResolvers } from "../../_types/graphql";
import { userService } from '../../services/userService';

export const accountResolvers: IResolvers = {
  Query: {
    accounts: () => userService.getAccounts(),
  },

  Mutation: {
    createAccount: async (_, args) => {
      const {
        account,
      } = args;

      if (userService.accountExists(account)) {
        return undefined;
      }

      const newAcc = await userService.createAccount(args.account);
      return newAcc.id;
    },
  },
};