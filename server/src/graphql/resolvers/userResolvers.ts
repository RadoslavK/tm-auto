import { IResolvers } from '../../_types/graphql';
import { userService } from '../../services/userService';

export const userResolvers: IResolvers = {
  Query: {
    isSignedIn: () => userService.isLoggedIn(),
  },
  Mutation: {
    signIn: (_parent, args) =>  {
      userService.login(args.account);
      return true;
    },
  }
};
