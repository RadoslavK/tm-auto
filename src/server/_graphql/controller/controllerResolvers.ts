import { Resolvers } from '../../_types/resolvers.type';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { controllerService } from '../../services/controllerService';

export default <Resolvers>{
  Query: {
    isBotActive: () => controllerService.isActive(),
    botState: () => controllerService.state(),
  },

  Mutation: {
    signIn: (_, args) => {
      controllerService.signIn(args.accountId);
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

  Subscription: {
    botActivityChanged: subscribeToEvent(BotEvent.BotActivityChanged, {
      resolve: p => p.isActive,
    }),
    onBotRunningChanged: subscribeToEvent(BotEvent.BotRunningChanged, {
      resolve: () => true,
    }),
  },
};