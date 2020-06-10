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
    signIn: (_, args) => controllerService.signIn(args.accountId),
    signOut: () => controllerService.signOut(),
    startBot: () => controllerService.start(),
    stopBot: () => controllerService.stop(),
  },

  Subscription: {
    botActivityChanged: subscribeToEvent(BotEvent.BotActivityChanged, {
      resolve: p => p.isActive,
    }),
    botStateChanged: subscribeToEvent(BotEvent.BotRunningChanged, {
      resolve: p => p.state,
    }),
  },
};