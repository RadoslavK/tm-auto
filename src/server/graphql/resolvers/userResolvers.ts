import { userService } from '../../services/userService';
import { IResolvers } from '../../_types/graphql';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Events } from '../subscriptions/events';

export const userResolvers: IResolvers = {
  Query: {
    isSignedIn: () => userService.get().isSignedIn,
  },

  Mutation: {
    signIn: (_, args) =>  {
      userService.get().signIn(args.account);
      return true;
    },
  },

  Subscription: {
    signedToggled: {
      subscribe: subscribeToEvent(Events.SignedInToggled),
      resolve: () => true,
    }
  },
};
