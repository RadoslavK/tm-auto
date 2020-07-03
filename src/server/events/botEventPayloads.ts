import { LogEntry } from '../_models/logs/logEntry';
import { MapSearchVillageTile } from '../_models/map/villageTile';
import { AccountSettings } from '../_models/settings/accountSettings';
import { AutoMentorSettings } from '../_models/settings/autoMentorSettings';
import { GeneralSettings } from '../_models/settings/generalSettings';
import { GeneralVillageSettings } from '../_models/settings/generalVillageSettings';
import { AutoAdventureSettings } from '../_models/settings/tasks/autoAdventureSettings';
import { AutoBuildSettings } from '../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../_models/settings/tasks/autoPartySettings';
import { AutoUnitsSettings } from '../_models/settings/tasks/autoUnitsSettings';
import { Village } from '../_models/village/village';
import { BotState, MapSearchState, TaskType } from '../_types/graphql.type';
import { UserAccount } from '../services/accountService';
import { BotEvent } from './botEvent';

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

  [BotEvent.AutoBuildSettingsUpdated]: {
    readonly settings: AutoBuildSettings;
    readonly villageId: string;
  };

  [BotEvent.AutoMentorSettingsUpdated]: {
    readonly settings: AutoMentorSettings;
  };

  [BotEvent.AutoPartySettingsUpdated]: {
    readonly settings: AutoPartySettings;
    readonly villageId: string;
  };

  [BotEvent.AutoUnitsSettingsUpdated]: {
    readonly settings: AutoUnitsSettings;
    readonly villageId: string;
  };

  [BotEvent.GeneralSettingsUpdated]: {
    readonly settings: GeneralSettings;
  };

  [BotEvent.GeneralVillageSettingsUpdated]: {
    readonly settings: GeneralVillageSettings;
    readonly villageId: string;
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
