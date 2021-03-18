import { Timestamp } from '../misc/timestamp.js';
import { Village } from '../village/village.js';
import { AutoBuildLogEntryContent } from './content/autoBuild.js';
import { AutoUnitsLogEntryContent } from './content/autoUnits.js';
import { ResourceClaimLogEntryContent } from './content/resourceClaim.js';
import { TextLogEntryContent } from './content/text.js';

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
