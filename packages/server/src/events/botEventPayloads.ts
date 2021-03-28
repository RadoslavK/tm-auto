import type { LogEntry } from '../_models/logs/logEntry.js';
import type { MapSearchVillageTile } from '../_models/map/villageTile.js';
import type { TaskType } from '../_models/misc/taskType.js';
import type { AccountSettings } from '../_models/settings/accountSettings.js';
import type { AutoMentorSettings } from '../_models/settings/autoMentorSettings.js';
import type { HeroLevelUpSettings } from '../_models/settings/heroLevelUpSettings.js';
import type { AutoAdventureSettings } from '../_models/settings/tasks/autoAdventureSettings.js';
import type { AutoUnitsSettings } from '../_models/settings/tasks/autoUnitsSettings.js';
import type { Village } from '../_models/village/village.js';
import type { UserAccount } from '../services/accountService.js';
import type { BotState } from '../services/controllerService.js';
import type { MapSearchState } from '../services/mapScan/mapScanService.js';
import { BotEvent } from './botEvent.js';

export type BotEventPayloads = {
  [BotEvent.AccountsUpdated]: {
    readonly accounts: readonly UserAccount[];
  };

  [BotEvent.LastSignedAccountIdUpdated]: {
    readonly lastSignedAccountId: string | null;
  };

  [BotEvent.AccountSettingsUpdated]: {
    readonly settings: AccountSettings;
  };

  [BotEvent.AutoAdventureSettingsUpdated]: {
    readonly settings: AutoAdventureSettings;
  };

  [BotEvent.AutoMentorSettingsUpdated]: {
    readonly settings: AutoMentorSettings;
  };

  [BotEvent.AutoUnitsSettingsUpdated]: {
    readonly settings: AutoUnitsSettings;
    readonly villageId: string;
  };

  [BotEvent.HeroLevelUpSettingsChanged]: {
    readonly settings: HeroLevelUpSettings;
  };

  // TODO when subscribeToEvent is typed properly we can pass values directly rather than this
  [BotEvent.BotActivityChanged]: {
    readonly isActive: boolean;
  };

  [BotEvent.BotRunningChanged]: {
    readonly state: BotState;
  };

  [BotEvent.ActualBuildingLevelsUpdated]: {
    readonly villageId: string;
  };

  [BotEvent.QueuedUpdated]: {
    readonly villageId: string;
  };

  [BotEvent.BuildingsInProgressUpdated]: {
    readonly villageId: string;
  };

  [BotEvent.LogEntryAdded]: {
    readonly logEntry: LogEntry;
  };

  [BotEvent.ActiveVillageIdChanged]: {
    readonly villageId: string;
  };

  [BotEvent.NextTasksExecutionChanged]: {
    readonly nextExecution: Date;
  };

  [BotEvent.NextTaskExecutionChanged]: {
    readonly nextExecution: Date;
    readonly task: TaskType;
  };

  [BotEvent.NextVillageTaskExecutionChanged]: {
    readonly nextExecution: Date;
    readonly task: TaskType;
    readonly villageId: string;
  };

  [BotEvent.VillageUpdated]: {
    readonly village: Village;
  };

  [BotEvent.VillagesUpdated]: {
    readonly villages: readonly Village[];
  };

  [BotEvent.MapScanProgressUpdated]: {
    readonly scanProgress: number;
  };

  [BotEvent.MapSearchStateChanged]: {
    readonly state: MapSearchState;
  };

  [BotEvent.MapSearchFinished]: {
    readonly tiles: readonly MapSearchVillageTile[];
  };
};
