import { LogEntry } from '../_models/logs/logEntry';
import { Village } from '../_models/village/village';
import { VillageCrannyCapacity } from '../_models/village/villageCrannyCapacity';
import { TaskType } from '../../_shared/types/taskType';
import { BotEvent } from './botEvent';

export type BotEventPayloads = {
  [BotEvent.ActualBuildingLevelsUpdated]: {
    readonly villageId: number;
  },

  [BotEvent.QueuedUpdated]: {
    readonly villageId: number
  },

  [BotEvent.BuildingsInProgressUpdated]: {
    readonly villageId: number;
  }

  [BotEvent.LogEntryAdded]: {
    readonly logEntry: LogEntry;
  },

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
    readonly task: TaskType;
    readonly villageId: number;
  },

  [BotEvent.CrannyCapacityUpdated]: {
    readonly villageId: number;
    readonly capacity: VillageCrannyCapacity
  }

  [BotEvent.VillageUpdated]: {
    readonly village: Village;
  };

  [BotEvent.VillagesUpdated]: {
    readonly villages: readonly Village[];
  };
};