import { AutoBuildLogEntryContent as AutoBuildLogEntryContentModel } from '../../_models/logs/content/autoBuild';
import { AutoUnitsLogEntryContent as AutoUnitsLogEntryContentModel } from '../../_models/logs/content/autoUnits';
import { TextLogEntryContent as TextLogEntryContentModel } from '../../_models/logs/content/text';
import {
  LogEntry as LogEntryModel,
  LogEntryContent as LogEntryContentModel,
} from '../../_models/logs/logEntry';
import {
  AutoBuildLogEntryContent,
  AutoUnitsLogEntryContent,
  LogEntry,
  LogEntryContent,
  TextLogEntryContent,
} from '../../_types/graphql';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';
import { mapVillage } from './villageResolvers';

const mapContent = (content: LogEntryContentModel): LogEntryContent => {
  if (content instanceof AutoBuildLogEntryContentModel) {
    return { autoBuild: content };
  }

  if (content instanceof AutoUnitsLogEntryContentModel) {
    return { autoUnits: content };
  }

  if (content instanceof TextLogEntryContentModel) {
    return { text: content };
  }

  throw new Error(`Unknown content model: ${JSON.stringify(content)}`);
};

const mapLogEntry = (entry: LogEntryModel): LogEntry => ({
  content: mapContent(entry.content),
  id: entry.id,
  timestamp: entry.timestamp.totalSeconds,
  village: entry.village && mapVillage(entry.village),
});

export const logsResolvers: Resolvers = {
  LogEntryContent: {
    //  receives the GraphQL model already
    __resolveType: (content) => {
      if ((content as TextLogEntryContent).text !== undefined) {
        return 'TextLogEntryContent';
      }

      if ((content as AutoBuildLogEntryContent).autoBuild !== undefined) {
        return 'AutoBuildLogEntryContent';
      }

      if ((content as AutoUnitsLogEntryContent).autoUnits !== undefined) {
        return 'AutoUnitsLogEntryContent';
      }

      return null;
    },
  },

  Query: {
    logsEntries: () => accountContext.logsService.logEntries().map(x => mapLogEntry(x)),
  },

  Subscription: {
    onLogEntryAdded: subscribeToEvent(BotEvent.LogEntryAdded, {
      resolve: payload => mapLogEntry(payload.logEntry),
    }),
  },
};