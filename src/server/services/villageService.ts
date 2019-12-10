import { Coords } from '../_models/coords';
import { Village } from '../_models/village/village';
import { BotEvent } from '../graphql/subscriptions/botEvent';
import { publishPayloadEvent } from '../graphql/subscriptions/pubSub';
import { dataPathService } from './dataPathService';
import { fileService } from './fileService';

export class VillageService {
  private _currentVillageId: number;

  get currentVillageId(): number {
    return this._currentVillageId;
  }

  set currentVillageId(villageId: number) {
    this._currentVillageId = villageId;
    publishPayloadEvent(BotEvent.ActiveVillageIdChanged, { villageId });
  }

  private readonly m_villages: Record<string, Village> = {};

  public allVillages = (): readonly Village[] => Object.values(this.m_villages);

  public village = (villageId: number): Village => this.m_villages[villageId];

  public currentVillage = (): Village => this.village(this.currentVillageId);

  public updateVillages = (villages: readonly Village[]): void => {
    const oldVillages = Object
      .values(this.m_villages)
      .filter(v => !villages.some(x => x.id === v.id));

    oldVillages.forEach(village => {
      const villageDataPath = dataPathService.baseVillagePath(village.id);
      fileService.delete(villageDataPath);
    });

    const newVillages = villages
      .filter(v => !this.m_villages[v.id]);

    Object
      .keys(this.m_villages)
      .forEach(villageId => {
        if (oldVillages.some(v => v.id === +villageId)) {
          delete this.m_villages[villageId];
        }
      });

    newVillages.forEach(village => {
      this.m_villages[village.id] = village;
    });
  };

  public villageByCoords = (coords: Coords): Village | undefined => this
    .allVillages()
    .find(x => x.coords.x === coords.x && x.coords.y === coords.y);

  public capitalVillage = (): Village | undefined => this
    .allVillages()
    .find(x => x.isCapital);

  public setCapital = (coords: Coords): { readonly capitalChanged: boolean; } => {
    const village = this.villageByCoords(coords);

    if (!village) {
      throw new Error(`No village at coords ${coords.toString()} was found`);
    }

    const previousCapitalVillage = this.capitalVillage();

    if (previousCapitalVillage === village) {
      return { capitalChanged: false };
    }

    if (previousCapitalVillage) {
      previousCapitalVillage.isCapital = false;
    }

    village.isCapital = true;

    return { capitalChanged: true };
  };
}
