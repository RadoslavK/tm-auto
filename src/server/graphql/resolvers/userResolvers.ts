import { userService } from '../../services/userService';
import { IResolvers } from '../../_types/graphql';

export const userResolvers: IResolvers = {
  Query: {
    isSignedIn: () => userService.get().isSignedIn,
  },

  Mutation: {
    signIn: (_, args) =>  {
      userService.get().signIn(args.account);
      return true;
    },
  }
};
