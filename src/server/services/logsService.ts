import { BotEvent } from '../_graphql/subscriptions/botEvent';
import { publishPayloadEvent } from '../_graphql/subscriptions/pubSub';
import { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding';
import { AutoBuildLogEntryContent } from '../_models/logs/content/autoBuild';
import { AutoUnitsLogEntryContent } from '../_models/logs/content/autoUnits';
import { TextLogEntryContent } from '../_models/logs/content/text';
import {
  LogEntry,
  LogEntryContent,
} from '../_models/logs/logEntry';
import { Timestamp } from '../_models/misc/timestamp';
import { generateId } from '../../_shared/generateId';
import { accountContext } from '../accountContext';
import { buildingInfoService } from './info/buildingInfoService';
import { unitInfoService } from './info/unitInfoService';

type LogAutoUnitsParams = {
  readonly amount: number;
  readonly index: number;
};

export class LogsService {
  private readonly entries: LogEntry[] = [];

  public logEntries = (): readonly LogEntry[] => this.entries;

  public logText = (message: string, fromVillage = false): void => {
    const content = new TextLogEntryContent({
      message,
    });

    this.log(content, fromVillage);
  };

  public logAutoBuild = (building: QueuedBuilding): void => {
    const content = new AutoBuildLogEntryContent({
      fieldId: building.fieldId,
      level: building.level,
      name: buildingInfoService.getBuildingInfo(building.type).name,
      type: building.type,
    });

    this.log(content, true);
  };

  public logAutoUnits = (params: LogAutoUnitsParams): void => {
    const {
      amount,
      index,
    } = params;

    const { tribe } = accountContext.gameInfo;
    const { name } = unitInfoService.getUnitInfo(index);

    const content = new AutoUnitsLogEntryContent({
      amount,
      index,
      tribe,
      unitName: name,
    });

    this.log(content, true);
  };

  private log = (content: LogEntryContent, fromVillage: boolean): void => {
    const id = generateId();
    const timestamp = new Timestamp({ totalSeconds: Math.round(Date.now() / 1000) });
    const village = fromVillage ? accountContext.villageService.currentVillage() : null;

    this.addEntry(new LogEntry({
      content,
      id,
      timestamp,
      village,
    }));
  };

  private addEntry = (logEntry: LogEntry): void => {
    this.entries.push(logEntry);
    publishPayloadEvent(BotEvent.LogEntryAdded, { logEntry });
  };
}
