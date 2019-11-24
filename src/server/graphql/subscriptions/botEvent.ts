import { ILogEntry } from '../../_types/graphql';
import { Hero } from '../../_models/hero/hero';

export enum BotEvent {
  BuildingsUpdated = 'BuildingsUpdated',
  QueuedUpdated = 'QueueUpdated',
  VillageUpdated = 'VillageUpdated',
  VillagesUpdated = 'VillagesUpdated',
  BotRunningChanged = 'BotRunningChanged',
  LogEntryAdded = 'LogEntryAdded',
  HeroInformationUpdated = 'HeroInformationUpdated',
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
}
