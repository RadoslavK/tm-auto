import { BuildingType } from '../_shared/types/buildingType';
import { Tribe } from '../_shared/types/tribe';
import { Coords } from './_models/coords';
import { GameInfo } from './_models/gameInfo';
import { Hero } from './_models/hero/hero';
import { MentorTask } from './_models/mentor/mentorTask';
import { Resources } from './_models/misc/resources';
import { Village } from './_models/village/village';
import { VillageCapacity } from './_models/village/villageCapacity';
import { VillageResources } from './_models/village/villageResources';
import { accountService } from './services/accountService';
import { BuildingQueueService } from './services/buildingQueueService';
import { LogsService } from './services/logsService';
import { NextExecutionService } from './services/nextExecutionService';
import { SettingsService } from './services/settings';
import { VillageService } from './services/villageService';

export class AccountContext {
  private _buildingQueueServices: Map<number, BuildingQueueService> = new Map<number, BuildingQueueService>();

  public villageService: VillageService = new VillageService();
  public settingsService: SettingsService = new SettingsService();
  public logsService: LogsService = new LogsService();
  public buildingQueueService = {
    for: (villageId: number): BuildingQueueService => {
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
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
class AccountContextMock extends AccountContext {
  constructor() {
    super();

    (accountService as any).currentAccountId = '1';
    (accountService as any).accountsData = {
      accounts: [
        {
          id: '1',
          password: 'Haha',
          server: 'lol',
          username: 'Jozo',
        },
      ],
      lastSignedAccountId: '1',
    };
    (accountService as any).accountsLoaded = true;

    const villages: Village[] = [
      new Village({
        coords: new Coords(),
        id: 1,
        name: 'Village 1',
        resources: new VillageResources({
          amount: new Resources({
            clay: 444, crop: 666, freeCrop: 14, iron: 555, wood: 333,
          }),
          capacity: new VillageCapacity({ granary: 1111, warehouse: 2222 }),
          production: new Resources({
            clay: 44, crop: 66, iron: 55, wood: 33,
          }),
        }),
      }),
      new Village({
        coords: new Coords({ x: 10, y: 10 }),
        id: 2,
        name: 'Village 2',
        resources: new VillageResources({
          amount: new Resources({
            clay: 444, crop: 666, freeCrop: 14, iron: 555, wood: 333,
          }),
          capacity: new VillageCapacity({ granary: 1111, warehouse: 2222 }),
          production: new Resources({
            clay: 44, crop: 66, iron: 55, wood: 33,
          }),
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

    this.gameInfo.speed = 3;
    this.gameInfo.tribe = Tribe.Teutons;
  }
}

let _accountContext: AccountContext | null = null;

export const getAccountContext = (): AccountContext => {
  if (!_accountContext) {
    _accountContext = new AccountContext();
  }

  return _accountContext;
};

export const resetAccountContext = () => {
  _accountContext = null;
};

// export const accountContext = new AccountContext();
