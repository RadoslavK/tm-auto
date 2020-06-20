import { LogEntry } from '../_models/logs/logEntry';
import { Village } from '../_models/village/village';
import { BotState, TaskType } from '../_types/graphql.type';
import { BotEvent } from './botEvent';

export type BotEventPayloads = {
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
};
