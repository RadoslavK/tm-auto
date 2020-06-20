import { GameInfo } from './_models/gameInfo';
import { Hero } from './_models/hero/hero';
import { MentorTask } from './_models/mentor/mentorTask';
import { BuildingQueueService } from './services/buildingQueueService';
import { LogsService } from './services/logsService';
import { NextExecutionService } from './services/nextExecutionService';
import { SettingsService } from './services/settings';
import { VillageService } from './services/villageService';

export class AccountContext {
  private _buildingQueueServices: Map<string, BuildingQueueService> = new Map<
    string,
    BuildingQueueService
  >();

  public villageService: VillageService;

  public settingsService: SettingsService;

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
  }
}

let accountContextField: AccountContext | null = null;

export const getAccountContext = (): AccountContext => {
  if (!accountContextField) {
    throw new Error('Account context has not been initialized');
  }

  return accountContextField;
};

export const setAccountContext = (accountId: string) => {
  if (accountContextField) {
    throw new Error('Didnt you want to reset account countext first?');
  }

  accountContextField = new AccountContext(accountId);
};

export const resetAccountContext = () => {
  accountContextField = null;
};
