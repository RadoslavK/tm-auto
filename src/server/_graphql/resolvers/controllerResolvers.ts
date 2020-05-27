import { controllerService } from '../../services/controllerService';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';

export const controllerResolvers: Resolvers = {
  Mutation: {
    signIn: (_, args) => {
      controllerService.signIn(args);
      return true;
    },

    signOut: () => {
      controllerService.signOut();
      return true;
    },

    startBot: () => {
      controllerService.start();
      return true;
    },

    stopBot: () => {
      controllerService.stop();
      return true;
    },
  },

  Query: {
    botState: () => controllerService.state(),
  },

  Subscription: {
    onBotRunningChanged: subscribeToEvent(BotEvent.BotRunningChanged, {
      resolve: () => true,
    }),
  },
};
