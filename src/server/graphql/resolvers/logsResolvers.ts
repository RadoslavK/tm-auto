import {
  IAutoBuildLogEntryContent,
  IAutoUnitsLogEntryContent,
  IResolvers,
  ISubscription,
  ITextLogEntryContent,
} from '../../_types/graphql';
import {
  resolvePayloadEvent,
  subscribeToPayloadEvent,
} from '../subscriptions/pubSub';
import { Events } from '../subscriptions/events';
import { accountContext } from '../../accountContext';

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
    onLogEntryAdded: {
      subscribe: subscribeToPayloadEvent(Events.LogEntryAdded),
      resolve: resolvePayloadEvent<Events.LogEntryAdded, ISubscription['onLogEntryAdded']>(payload => payload.logEntry),
    },
  },
};