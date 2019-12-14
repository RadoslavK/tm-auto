import { BuildingType } from '../_shared/types/buildingType';
import { Tribe } from '../_shared/types/tribe';
import { Coords } from './_models/coords';
import { GameInfo } from './_models/gameInfo';
import { Hero } from './_models/hero/hero';
import { Resources } from './_models/misc/resources';
import { Village } from './_models/village/village';
import { VillageCapacity } from './_models/village/villageCapacity';
import { VillageResources } from './_models/village/villageResources';
import { accountService } from './services/accountService';
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

class AccountContextMock extends AccountContext {
  constructor() {
    super();

    (accountService as any).currentAccountId = '1';
    (accountService as any).accountsData = {
      lastSignedAccountId: '1',
      accounts: [
        {
          id: '1',
          username: 'Jozo',
          password: 'Haha',
          server: 'lol',
        }],
    };
    (accountService as any).accountsLoaded = true;

    this.initialize();

    const villages: Village[] = [
      new Village({
        coords: new Coords({ x: 0, y: 0 }),
        name: 'Village 1',
        id: 1,
        resources: new VillageResources({
          amount: new Resources({ wood: 333, clay: 444, iron: 555, crop: 666, freeCrop: 14 }),
          production: new Resources({ wood: 33, clay: 44, iron: 55, crop: 66 }),
          capacity: new VillageCapacity( { warehouse: 2222, granary: 1111 }),
        }),
      }),
      new Village({
        coords: new Coords({ x: 10, y: 10 }),
        name: 'Village 2',
        id: 2,
        resources: new VillageResources({
          amount: new Resources({ wood: 333, clay: 444, iron: 555, crop: 666, freeCrop: 14 }),
          production: new Resources({ wood: 33, clay: 44, iron: 55, crop: 66 }),
          capacity: new VillageCapacity( { warehouse: 2222, granary: 1111 }),
        }),
      }),
    ];

    const res = [...new Array(18).keys()].map(i => ({
      fieldId: i + 1,
      level: 0,
      type: BuildingType.Wood,
    }));

    villages[0].buildings.updateActual(res);
    villages[1].buildings.updateActual(res);

    this.villageService.updateVillages(villages);
    this.villageService.setCapital(villages[0].coords);
    this.villageService.currentVillageId = villages[0].id;

    this.gameInfo = {
      ...this.gameInfo,
      speed: 3,
      tribe: Tribe.Teutons,
    };
  }
}

// export const accountContext = new AccountContext();
export const accountContext = new AccountContextMock();
