import { accountService } from '../../services/accountService';
import { IResolvers } from '../../_types/graphql';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Events } from '../subscriptions/events';

export const userResolvers: IResolvers = {
  Query: {
    isSignedIn: () => accountService.isSignedIn(),
  },

  Mutation: {
    signIn: (_, args) =>  {
      accountService.signIn(args);
      return true;
    },

    signOut: () => {
      accountService.signOut();
      return true;
    },
  },
};
