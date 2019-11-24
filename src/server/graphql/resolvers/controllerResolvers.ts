import { IResolvers } from '../../_types/graphql';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { BotEvent } from '../subscriptions/botEvent';
import { controllerService } from '../../services/controllerService';

export const controllerResolvers: IResolvers = {
  Query: {
    botState: () => controllerService.state(),
  },

  Mutation: {
    startBot: () => {
      controllerService.start();
      return true;
    },

    stopBot: () => {
      controllerService.stop();
      return true;
    },

    signIn: (_, args) =>  {
      controllerService.signIn(args);
      return true;
    },

    signOut: () => {
      controllerService.signOut();
      return true;
    },
  },

  Subscription: {
    onBotRunningChanged: subscribeToEvent(BotEvent.BotRunningChanged, {
      resolve: () => true,
    }),
  },
};
