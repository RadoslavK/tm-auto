import { AutoBuildLogEntryContent } from '../../_models/logs/content/autoBuild';
import { AutoUnitsLogEntryContent } from '../../_models/logs/content/autoUnits';
import { TextLogEntryContent } from '../../_models/logs/content/text';
import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
  LogEntryContent: {
    //  receives the GraphQL model already
    __resolveType: (content) => {
      if (content instanceof TextLogEntryContent) {
        return 'TextLogEntryContent';
      }

      if (content instanceof AutoBuildLogEntryContent) {
        return 'AutoBuildLogEntryContent';
      }

      if (content instanceof AutoUnitsLogEntryContent) {
        return 'AutoUnitsLogEntryContent';
      }

      return null;
    },
  },

  TextLogEntryContent: {
    messageType: c => c.type,
  },

  Query: {
    logsEntries: () => getAccountContext().logsService.logEntries(),
  },

  Subscription: {
    onLogEntryAdded: subscribeToEvent(BotEvent.LogEntryAdded, {
      resolve: payload => payload.logEntry,
    }),
  },
};