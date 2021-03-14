import { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding';
import { AutoBuildLogEntryContent } from '../_models/logs/content/autoBuild';
import { AutoUnitsLogEntryContent } from '../_models/logs/content/autoUnits';
import {
  ClaimHeroResourcesReason,
  ResourceClaimLogEntryContent,
} from '../_models/logs/content/resourceClaim';
import {
  TextLogEntryContent,
  TextLogEntryType,
} from '../_models/logs/content/text';
import { LogEntry, LogEntryContent } from '../_models/logs/logEntry';
import { Resources } from '../_models/misc/resources';
import { Timestamp } from '../_models/misc/timestamp';
import { getAccountContext } from '../accountContext';
import { BotEvent } from '../events/botEvent';
import { publishPayloadEvent } from '../pubSub';
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
      type: TextLogEntryType.Info,
    });

    this.log(content, fromVillage);
  };

  public logError = (message: string): void => {
    const content = new TextLogEntryContent({
      message,
      type: TextLogEntryType.Error,
    });

    this.log(content);
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
    const { amount, index } = params;

    const { tribe } = getAccountContext().gameInfo;
    const { name } = unitInfoService.getUnitInfo(index);

    const content = new AutoUnitsLogEntryContent({
      amount,
      index,
      tribe,
      unitName: name,
    });

    this.log(content, true);
  };

  public logResourceClaim = (
    resources: Resources,
    reason: ClaimHeroResourcesReason,
  ): void => {
    const content = new ResourceClaimLogEntryContent({
      reason,
      resources,
    });

    this.log(content, true);
  };

  private log = (content: LogEntryContent, fromVillage = false): void => {
    const timestamp = new Timestamp({
      totalSeconds: Math.round(Date.now() / 1000),
    });
    const village = fromVillage
      ? getAccountContext().villageService.currentVillage()
      : null;

    this.addEntry({
      content,
      timestamp,
      village,
    });
  };

  private addEntry = (logEntry: LogEntry): void => {
    this.entries.unshift(logEntry);
    publishPayloadEvent(BotEvent.LogEntryAdded, { logEntry });
  };
}
