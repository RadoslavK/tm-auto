import { Resolvers } from '../../_types';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
  Subscription: {
    onBotRunningChanged: subscribeToEvent(BotEvent.BotRunningChanged, {
      resolve: () => true,
    }),
  },
};