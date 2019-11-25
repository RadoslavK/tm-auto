import { VillageService } from './services/villageService';
import { GameInfo } from './_models/gameInfo';
import { Hero } from './_models/hero/hero';
import { SettingsService } from './services/settings';
import { LogsService } from './services/logsService';

class AccountContext {
  public villageService: VillageService;
  public settingsService: SettingsService;
  public logsService: LogsService;

  public gameInfo: GameInfo;
  public hero: Hero;

  public initialize = (): void => {
    this.villageService = new VillageService();
    this.settingsService = new SettingsService();
    this.logsService = new LogsService();
    this.gameInfo = new GameInfo();
    this.hero = new Hero();
  };
}

export const accountContext = new AccountContext();