import {
  IAutoBuildLogEntryContent,
  IAutoUnitsLogEntryContent,
  IResolvers,
  ITextLogEntryContent,
} from '../../_types/graphql';
import { BotEvent } from '../subscriptions/botEvent';
import { accountContext } from '../../accountContext';
import { subscribeToEvent } from '../subscriptions/pubSub';

export const logsResolvers: IResolvers = {
  LogEntryContent: {
    __resolveType: (content) => {
      if ((content as ITextLogEntryContent).text !== undefined) {
        return 'TextLogEntryContent';
      }

      if ((content as IAutoBuildLogEntryContent).autoBuild !== undefined) {
        return 'AutoBuildLogEntryContent';
      }

      if ((content as IAutoUnitsLogEntryContent).autoUnits !== undefined) {
        return 'AutoUnitsLogEntryContent';
      }

      return undefined;
    },
  },

  Query: {
    logsEntries: () => accountContext.logsService.logEntries(),
  },

  Subscription: {
    onLogEntryAdded: subscribeToEvent(BotEvent.LogEntryAdded, {
      resolve: payload => payload.logEntry,
    }),
  },
};