import { IResolvers } from '../../_types/graphql';
import { controllerService } from '../../services/controllerService';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Events } from '../subscriptions/events';

export const controllerResolvers: IResolvers = {
  Query: {
    isBotRunning: () => controllerService.get().isRunning(),
  },

  Mutation: {
    startBot: () => {
      controllerService.get().start();
      return true;
    },

    stopBot: () => {
      controllerService.get().stop();
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
