import type { Timestamp } from '../misc/timestamp.js';
import type { Village } from '../village/village.js';
import type { AutoBuildLogEntryContent } from './content/autoBuild.js';
import type { AutoUnitsLogEntryContent } from './content/autoUnits.js';
import type { ResourceClaimLogEntryContent } from './content/resourceClaim.js';
import type { TextLogEntryContent } from './content/text.js';
import type { UnitUpgradeLogEntryContent } from './content/unitUpgrade.js';

export type LogEntryContent =
  | TextLogEntryContent
  | AutoBuildLogEntryContent
  | AutoUnitsLogEntryContent
  | ResourceClaimLogEntryContent
  | UnitUpgradeLogEntryContent;

export type LogEntry = {
  readonly id: string;
  readonly content: LogEntryContent;
  readonly timestamp: Timestamp;
  readonly village: Village | null;
};
