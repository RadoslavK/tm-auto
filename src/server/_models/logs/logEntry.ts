import { Timestamp } from '../misc/timestamp';
import { Village } from '../village/village';
import { AutoBuildLogEntryContent } from './content/autoBuild';
import { AutoUnitsLogEntryContent } from './content/autoUnits';
import { ResourceClaimLogEntryContent } from './content/resourceClaim';
import { TextLogEntryContent } from './content/text';

export type LogEntryContent =
  TextLogEntryContent
  | AutoBuildLogEntryContent
  | AutoUnitsLogEntryContent
  | ResourceClaimLogEntryContent;

export class LogEntry {
  public readonly content: LogEntryContent = new TextLogEntryContent();
  public readonly id: string = '';
  public readonly timestamp: Timestamp = new Timestamp();
  public readonly village: Village | null = null;

  constructor(params: LogEntry) {
    Object.assign(this, params);
  }
}