import { GameInfo } from './_models/gameInfo.js';
import { Hero } from './_models/hero/hero.js';
import { BuildingQueueService } from './services/buildingQueueService.js';
import { LogsService } from './services/logsService.js';
import { MapScanService } from './services/mapScan/mapScanService.js';
import { MapSearchService } from './services/mapSearchService/mapSearchService.js';
import { NextExecutionService } from './services/nextExecutionService.js';
import { SettingsService } from './services/settings';
import { VillageService } from './services/villageService.js';

export class AccountContext {
  private static _context: AccountContext | null = null;

  public static resetContext = (): void => {
    AccountContext._context = null;
  };

  public static setContext = (accountId: string) => {
    if (AccountContext._context) {
      throw new Error('Didnt you want to reset account context first?');
    }

    AccountContext._context = new AccountContext(accountId);
  };

  public static getContext = (): AccountContext => {
    if (!AccountContext._context) {
      throw new Error('Account context has not been initialized');
    }

    return AccountContext._context;
  };

  public static getContextUnsafe = (): AccountContext | null => {
    return AccountContext._context;
  };

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

  constructor(accountId: string) {
    this.villageService = new VillageService();
    this.settingsService = new SettingsService(accountId);
    this.mapScanService = new MapScanService(accountId);
  }
}