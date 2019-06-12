import { IResolvers } from '../../_types/graphql';
import { context } from '../context';

export const userResolvers: IResolvers = {
  Query: {
    isSignedIn: () => context.user.isSignedIn,
  },

  Mutation: {
    signIn: (_, args) =>  {
      context.user.signIn(args.account);
      return true;
    },
  }
};
