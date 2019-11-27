import { Hero } from '../../_models/hero/hero';
import { GeneralSettings } from '../../_models/settings/generalSettings';
import { GeneralVillageSettings } from '../../_models/settings/generalVillageSettings';
import { AutoAdventureSettings } from '../../_models/settings/tasks/autoAdventureSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/autoBuildSettings';
import { AutoUnitsSettings } from '../../_models/settings/tasks/autoUnitsSettings';
import {
  ILogEntry,
} from '../../_types/graphql';

export enum BotEvent {
  BuildingsUpdated = 'BuildingsUpdated',
  QueuedUpdated = 'QueueUpdated',
  VillageUpdated = 'VillageUpdated',
  VillagesUpdated = 'VillagesUpdated',
  BotRunningChanged = 'BotRunningChanged',
  LogEntryAdded = 'LogEntryAdded',
  HeroInformationUpdated = 'HeroInformationUpdated',

  GeneralSettingsChanged = 'GeneralSettingsChanged',
  AutoAdventureSettingsChanged = 'AutoAdventureSettingsChanged',
  GeneralVillageSettingsChanged = 'GeneralVillageSettingsChanged',
  AutoBuildSettingsChanged = 'AutoBuildSettingsChanged',
  AutoUnitsSettingsChanged = 'AutoUnitsSettingsChanged'
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
    readonly villageId: number;
    readonly settings: GeneralVillageSettings;
  }

  [BotEvent.AutoBuildSettingsChanged]: {
    readonly villageId: number;
    readonly settings: AutoBuildSettings;
  }

  [BotEvent.AutoUnitsSettingsChanged]: {
    readonly villageId: number;
    readonly settings: AutoUnitsSettings;
  }
}
