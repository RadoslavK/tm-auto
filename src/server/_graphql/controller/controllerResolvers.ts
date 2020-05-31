import { Resolvers } from '../../_types/resolvers.type';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { controllerService } from '../../services/controllerService';

export default <Resolvers>{
  Query: {
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
    onBotRunningChanged: subscribeToEvent(BotEvent.BotRunningChanged, {
      resolve: () => true,
    }),
  },
};