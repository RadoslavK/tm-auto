import type { Tribe } from 'shared/enums/Tribe.js';
import { generateId } from 'shared/utils/generateId.js';

import type { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding.js';
import { AutoBuildLogEntryContent } from '../_models/logs/content/autoBuild.js';
import { AutoUnitsLogEntryContent } from '../_models/logs/content/autoUnits.js';
import {
  ClaimHeroResourcesReason,
  ResourceClaimLogEntryContent,
} from '../_models/logs/content/resourceClaim.js';
import {
  TextLogEntryContent,
  TextLogEntryType,
} from '../_models/logs/content/text.js';
import { UnitUpgradeLogEntryContent } from '../_models/logs/content/unitUpgrade.js';
import type {
  LogEntry,
  LogEntryContent, 
} from '../_models/logs/logEntry.js';
import type { Resources } from '../_models/misc/resources.js';
import { Timestamp } from '../_models/misc/timestamp.js';
import { AccountContext } from '../accountContext.js';
import { BotEvent } from '../events/botEvent.js';
import { publishPayloadEvent } from '../pubSub.js';
import { buildingInfoService } from './info/buildingInfoService.js';
import { unitInfoService } from './info/unitInfoService.js';

type LogAutoUnitsParams = {
  readonly amount: number;
  readonly index: number;
  readonly tribe: Tribe;
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
      level: building.startingLevel,
      name: buildingInfoService.getBuildingInfo(building.type).name,
      type: building.type,
    });

    this.log(content, true);
  };

  public logAutoUnits = (params: LogAutoUnitsParams): void => {
    const { amount, index, tribe } = params;

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

  public logUnitUpgrade = (params: { readonly unitIndex: number; readonly level: number; }): void => {
    const content = new UnitUpgradeLogEntryContent({
      level: params.level,
      unitIndex: params.unitIndex,
    });

    this.log(content, true);
  };

  private log = (content: LogEntryContent, fromVillage = false): void => {
    const timestamp = new Timestamp({
      totalSeconds: Math.round(Date.now() / 1000),
    });
    const village = fromVillage
      ? AccountContext.getContext().villageService.currentVillage()
      : null;

    this.addEntry({
      id: generateId(),
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
