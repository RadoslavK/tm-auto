import { Resolvers } from '../../_types';
import { BotEvent } from '../../../events/botEvent';
import { mapLogEntry } from '../../mappers/mapLogEntry';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
  Subscription: {
    onLogEntryAdded: subscribeToEvent(BotEvent.LogEntryAdded, {
      resolve: payload => mapLogEntry(payload.logEntry),
    }),
  },
};