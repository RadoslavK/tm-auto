import { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding';
import {
  IAutoBuildLogEntryContent,
  IAutoUnitsLogEntryContent,
  ILogEntry,
  ILogEntryContent,
  ITextLogEntryContent,
} from '../_types/graphql';
import { generateId } from '../../_shared/generateId';
import { accountContext } from '../accountContext';
import { BotEvent } from '../graphql/subscriptions/botEvent';
import { publishPayloadEvent } from '../graphql/subscriptions/pubSub';
import { buildingInfoService } from './info/buildingInfoService';
import { unitInfoService } from './info/unitInfoService';

export interface ILogAutoUnitsParams {
  readonly amount: number;
  readonly index: number;
}

export class LogsService {
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
        name: buildingInfoService.getBuildingInfo(building.type).name,
        type: building.type,
      },
    };

    this.log(content, true);
  };

  public logAutoUnits = (params: ILogAutoUnitsParams): void => {
    const {
      amount,
      index,
    } = params;

    const { tribe } = accountContext.gameInfo;
    const { name } = unitInfoService.getUnitInfo(index);

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
    const id = generateId();
    const timestamp = Math.round(Date.now() / 1000);
    const village = fromVillage ? accountContext.villageService.currentVillage() : null;

    this.addEntry({
      content,
      id,
      timestamp,
      village,
    });
  };

  private addEntry = (logEntry: ILogEntry): void => {
    this.entries.push(logEntry);
    publishPayloadEvent(BotEvent.LogEntryAdded, { logEntry });
  };
}
