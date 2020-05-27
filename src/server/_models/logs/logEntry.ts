import { Timestamp } from '../misc/timestamp';
import { Village } from '../village/village';
import { AutoBuildLogEntryContent } from './content/autoBuild';
import { AutoUnitsLogEntryContent } from './content/autoUnits';
import { TextLogEntryContent } from './content/text';

export type LogEntryContent =
  TextLogEntryContent
  | AutoBuildLogEntryContent
  | AutoUnitsLogEntryContent;

export class LogEntry {
  public readonly content: LogEntryContent;
  public readonly id: string;
  public readonly timestamp: Timestamp;
  public readonly village: Village | null;

  constructor(params: LogEntry) {
    Object.assign(this, params);
  }
}