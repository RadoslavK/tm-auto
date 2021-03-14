import { Timestamp } from '../misc/timestamp';
import { Village } from '../village/village';
import { AutoBuildLogEntryContent } from './content/autoBuild';
import { AutoUnitsLogEntryContent } from './content/autoUnits';
import { ResourceClaimLogEntryContent } from './content/resourceClaim';
import { TextLogEntryContent } from './content/text';

export type LogEntryContent =
  | TextLogEntryContent
  | AutoBuildLogEntryContent
  | AutoUnitsLogEntryContent
  | ResourceClaimLogEntryContent;

export type LogEntry = {
  readonly content: LogEntryContent;
  readonly timestamp: Timestamp;
  readonly village: Village | null;
};
