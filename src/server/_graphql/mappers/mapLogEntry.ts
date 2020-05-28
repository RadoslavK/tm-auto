import { AutoBuildLogEntryContent as AutoBuildLogEntryContentModel } from '../../_models/logs/content/autoBuild';
import { AutoUnitsLogEntryContent as AutoUnitsLogEntryContentModel } from '../../_models/logs/content/autoUnits';
import { TextLogEntryContent as TextLogEntryContentModel } from '../../_models/logs/content/text';
import {
  LogEntry as LogEntryModel,
  LogEntryContent as LogEntryContentModel,
} from '../../_models/logs/logEntry';
import {
  LogEntry,
  LogEntryContent,
} from '../../_types/graphql';
import { mapVillage } from './villageMappers';

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

export const mapLogEntry = (entry: LogEntryModel): LogEntry => ({
  content: mapContent(entry.content),
  id: entry.id,
  timestamp: entry.timestamp.totalSeconds,
  village: entry.village && mapVillage(entry.village),
});