import uuid from 'uuid';
import {
  IAutoBuildLogEntryContent,
  IAutoUnitsLogEntryContent,
  ILogEntry,
  ILogEntryContent,
  ITextLogEntryContent,
} from '../_types/graphql';
import { villagesService } from './villageService';
import { mapVillage } from '../graphql/mappers/mapVillage';
import { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding';
import {
  buildingInfos,
  unitInfos,
} from '../bootstrap/loadInfo';
import { publishPayloadEvent } from '../graphql/subscriptions/pubSub';
import { Events } from '../graphql/subscriptions/events';
import { playerService } from './playerService';

export interface ILogAutoUnitsParams {
  readonly amount: number;
  readonly index: number;
}

class LogsService {
  private readonly entries: ILogEntry[] = [];

  public logEntries = (): readonly ILogEntry[] => this.entries;

  public logText = (message: string, fromVillage = false): void => {
    const content: ITextLogEntryContent = {
      text: { message },
    };

    this.log(content, fromVillage);
  };

  public logAutoBuild = (building: QueuedBuilding): void => {
    const content: IAutoBuildLogEntryContent = {
      autoBuild: {
        fieldId: building.fieldId,
        level: building.level,
        type: building.type,
        name: buildingInfos[building.type].name,
      },
    };

    this.log(content, true);
  };

  public logAutoUnits = (params: ILogAutoUnitsParams): void => {
    const {
      index,
      amount,
    } = params;

    const { tribe } = playerService.get();
    const { name } = unitInfos[tribe];

    const content: IAutoUnitsLogEntryContent = {
      autoUnits: {
        amount,
        index,
        tribe,
        unitName: name,
      },
    };

    this.log(content, true);
  };

  private log = (content: ILogEntryContent, fromVillage: boolean): void => {
    const id = uuid.v4();
    const timestamp = Math.round(Date.now() / 1000);
    const village = fromVillage ? villagesService.get().village() : undefined;

    this.addEntry({
      id,
      timestamp,
      content,
      village: village && mapVillage(village),
    });
  };

  private addEntry = (logEntry: ILogEntry): void => {
    this.entries.push(logEntry);
    publishPayloadEvent(Events.LogEntryAdded, { logEntry });
  };
}

export const logsService = new LogsService();