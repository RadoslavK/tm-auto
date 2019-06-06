import { IResolvers } from '../../_types/graphql';

export const userResolvers: IResolvers = {
  Query: {
    isSignedIn: (_, __, context) => context.userService.isSignedIn,
  },
  Mutation: {
    signIn: (_, args, context) =>  {
      context.userService.signIn(args.account);
      return true;
    },
  }
};
