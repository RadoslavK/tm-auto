import { GameInfo } from './_models/gameInfo';
import { Hero } from './_models/hero/hero';
import { LogsService } from './services/logsService';
import { NextExecutionService } from './services/nextExecutionService';
import { SettingsService } from './services/settings';
import { VillageService } from './services/villageService';

class AccountContext {
  public villageService: VillageService;
  public settingsService: SettingsService;
  public logsService: LogsService;
  public nextExecutionService: NextExecutionService;

  public gameInfo: GameInfo;
  public hero: Hero;

  public initialize = (): void => {
    this.villageService = new VillageService();
    this.settingsService = new SettingsService();
    this.logsService = new LogsService();
    this.nextExecutionService = new NextExecutionService();

    this.gameInfo = new GameInfo();
    this.hero = new Hero();
  };
}

export const accountContext = new AccountContext();
