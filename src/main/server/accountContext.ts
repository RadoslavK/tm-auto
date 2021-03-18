import { GameInfo } from './_models/gameInfo.js';
import { Hero } from './_models/hero/hero.js';
import { MentorTask } from './_models/mentor/mentorTask.js';
import { BuildingQueueService } from './services/buildingQueueService.js';
import { LogsService } from './services/logsService.js';
import { MapScanService } from './services/mapScan/mapScanService.js';
import { MapSearchService } from './services/mapSearchService/mapSearchService.js';
import { NextExecutionService } from './services/nextExecutionService.js';
import { SettingsService } from './services/settings';
import { VillageService } from './services/villageService.js';

export class AccountContext {
  private _buildingQueueServices: Map<string, BuildingQueueService> = new Map<
    string,
    BuildingQueueService
  >();

  public villageService: VillageService;

  public settingsService: SettingsService;

  public mapScanService: MapScanService;

  public mapSearchService: MapSearchService = new MapSearchService();

  public logsService: LogsService = new LogsService();

  public buildingQueueService = {
    for: (villageId: string): BuildingQueueService => {
      let service = this._buildingQueueServices.get(villageId);

      if (!service) {
        service = new BuildingQueueService(villageId);
        this._buildingQueueServices.set(villageId, service);
      }

      return service;
    },
  };

  public nextExecutionService: NextExecutionService = new NextExecutionService();

  public gameInfo: GameInfo = new GameInfo();

  public hero: Hero = new Hero();

  public mentorTasks: readonly MentorTask[] = [];

  constructor(accountId: string) {
    this.villageService = new VillageService();
    this.settingsService = new SettingsService(accountId);
    this.mapScanService = new MapScanService(accountId);
  }
}

let accountContextField: AccountContext | null = null;

export const getAccountContext = (): AccountContext => {
  if (!accountContextField) {
    throw new Error('Account context has not been initialized');
  }

  return accountContextField;
};

export const getAccountContextUnsafe = (): AccountContext | null =>
  accountContextField;

export const setAccountContext = (accountId: string) => {
  if (accountContextField) {
    throw new Error('Didnt you want to reset account countext first?');
  }

  accountContextField = new AccountContext(accountId);
};

export const resetAccountContext = () => {
  accountContextField = null;
};
