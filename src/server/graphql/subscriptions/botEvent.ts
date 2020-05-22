import { Hero } from '../../_models/hero/hero';
import { GeneralSettings } from '../../_models/settings/generalSettings';
import { GeneralVillageSettings } from '../../_models/settings/generalVillageSettings';
import { AutoAdventureSettings } from '../../_models/settings/tasks/autoAdventureSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../../_models/settings/tasks/autoPartySettings';
import { AutoUnitsSettings } from '../../_models/settings/tasks/autoUnitsSettings';
import {
  ILogEntry,
  TaskType,
  VillageTaskType,
} from '../../_types/graphql';

export enum BotEvent {
  ActiveVillageIdChanged = 'ActiveVillageIdChanged',
  AutoAdventureSettingsChanged = 'AutoAdventureSettingsChanged',
  AutoBuildSettingsChanged = 'AutoBuildSettingsChanged',
  AutoPartySettingsChanged = 'AutoPartySettingsChanged',
  AutoUnitsSettingsChanged = 'AutoUnitsSettingsChanged',
  BotRunningChanged = 'BotRunningChanged',
  BuildingsUpdated = 'BuildingsUpdated',
  CrannyCapacityUpdated = 'CrannyCapacityUpdated',

  GeneralSettingsChanged = 'GeneralSettingsChanged',
  GeneralVillageSettingsChanged = 'GeneralVillageSettingsChanged',
  HeroInformationUpdated = 'HeroInformationUpdated',
  LogEntryAdded = 'LogEntryAdded',
  NextTaskExecutionChanged = 'NextTaskExecutionChanged',
  NextTasksExecutionChanged = 'NextTasksExecutionChanged',

  NextVillageTaskExecutionChanged = 'NextVillageTaskExecutionChanged',
  QueuedUpdated = 'QueueUpdated',
  VillageUpdated = 'VillageUpdated',

  VillagesUpdated = 'VillagesUpdated'
}

export type BotEventPayloads = {
  [BotEvent.BuildingsUpdated]: {
    readonly villageId: number
  },

  [BotEvent.QueuedUpdated]: {
    readonly villageId: number
  },

  [BotEvent.LogEntryAdded]: {
    readonly logEntry: ILogEntry;
  },

  [BotEvent.HeroInformationUpdated]: {
    readonly heroInformation: Hero;
  }

  [BotEvent.GeneralSettingsChanged]: {
    readonly settings: GeneralSettings;
  }

  [BotEvent.AutoAdventureSettingsChanged]: {
    readonly settings: AutoAdventureSettings;
  }

  [BotEvent.GeneralVillageSettingsChanged]: {
    readonly settings: GeneralVillageSettings;
    readonly villageId: number;
  }

  [BotEvent.AutoBuildSettingsChanged]: {
    readonly settings: AutoBuildSettings;
    readonly villageId: number;
  }

  [BotEvent.AutoUnitsSettingsChanged]: {
    readonly settings: AutoUnitsSettings;
    readonly villageId: number;
  }

  [BotEvent.AutoPartySettingsChanged]: {
    readonly settings: AutoPartySettings;
    readonly villageId: number;
  }

  [BotEvent.ActiveVillageIdChanged]: {
    readonly villageId: number;
  }

  [BotEvent.NextTasksExecutionChanged]: {
    readonly nextExecution: Date;
  }

  [BotEvent.NextTaskExecutionChanged]: {
    readonly nextExecution: Date;
    readonly task: TaskType;
  }

  [BotEvent.NextVillageTaskExecutionChanged]: {
    readonly nextExecution: Date;
    readonly task: VillageTaskType;
    readonly villageId: number;
  },

  [BotEvent.CrannyCapacityUpdated]: {
    readonly villageId: number;
  }
};
