import { AutoBuildLogEntryContent } from '../../_models/logs/content/autoBuild';
import { AutoUnitsLogEntryContent } from '../../_models/logs/content/autoUnits';
import { ResourceClaimLogEntryContent } from '../../_models/logs/content/resourceClaim';
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
      if (content instanceof ResourceClaimLogEntryContent) {
        return 'ResourceClaimLogEntryContent';
      }
      return null;
    },
  },

  TextLogEntryContent: {
    messageType: c => c.type,
  },

  Query: {
    logEntries: () => getAccountContext().logsService.logEntries(),
  },

  Subscription: {
    logEntryAdded: subscribeToEvent(BotEvent.LogEntryAdded, {
      resolve: payload => payload.logEntry,
    }),
  },
};