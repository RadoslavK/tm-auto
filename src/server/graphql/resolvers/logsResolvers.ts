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
import { BotEvent } from '../subscriptions/botEvent';
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
      subscribe: subscribeToPayloadEvent(BotEvent.LogEntryAdded),
      resolve: resolvePayloadEvent<BotEvent.LogEntryAdded, ISubscription['onLogEntryAdded']>(payload => payload.logEntry),
    },
  },
};