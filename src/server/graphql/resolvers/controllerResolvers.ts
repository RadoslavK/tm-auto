import { IResolvers } from '../../_types/graphql';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Events } from '../subscriptions/events';
import { controllerService } from '../../services/controllerService';

export const controllerResolvers: IResolvers = {
  Query: {
    isBotRunning: () => controllerService.isRunning(),
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
  },

  Subscription: {
    onBotRunningChanged: {
      subscribe: subscribeToEvent(Events.BotRunningChanged),
      resolve: () => true,
    },
  },
};
