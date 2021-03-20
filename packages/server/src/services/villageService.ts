import type { Coords } from '../_models/coords.js';
import type { Village } from '../_models/village/village.js';
import { BotEvent } from '../events/botEvent.js';
import { publishPayloadEvent } from '../pubSub.js';
import { accountService } from './accountService.js';
import { dataPathService } from './dataPathService.js';
import { fileService } from './fileService.js';

export class VillageService {
  private _currentVillageId: string = '';

  get currentVillageId(): string {
    return this._currentVillageId;
  }

  set currentVillageId(villageId: string) {
    this._currentVillageId = villageId;
    publishPayloadEvent(BotEvent.ActiveVillageIdChanged, { villageId });
  }

  private _villages: Village[] = [];

  public allVillages = (): readonly Village[] => this._villages;

  public village = (villageId: string): Village => {
    const vill = this._villages.find((v) => v.id === villageId);

    if (!vill) {
      throw new Error(`Village with id ${villageId} does not exist`);
    }

    return vill;
  };

  public currentVillage = (): Village => this.village(this.currentVillageId);

  public updateVillages = (villages: readonly Village[]): void => {
    const oldVillages: Village[] = [];

    for (const existingVillage of this._villages) {
      const updatedVillage = villages.find((v) => v.id === existingVillage.id);

      if (!updatedVillage) {
        const accountId = accountService.getCurrentAccount().id;
        // old village to be deleted
        const { root: villageDataPath } = dataPathService.villagePath(
          accountId,
          existingVillage.id,
        );
        fileService.delete(villageDataPath);
        oldVillages.push(existingVillage);
      } else {
        existingVillage.name = updatedVillage.name;
      }
    }

    // add new villages
    villages
      .filter(
        (v) =>
          !this._villages.some(
            (existingVillage) => existingVillage.id === v.id,
          ),
      )
      .forEach((village) => {
        this._villages.push(village);
      });

    this._villages = this._villages.filter((v) => !oldVillages.includes(v));
  };

  public villageByCoords = (coords: Coords): Village | undefined =>
    this._villages.find(
      (x) => x.coords.x === coords.x && x.coords.y === coords.y,
    );

  public capitalVillage = (): Village | undefined =>
    this._villages.find((x) => x.isCapital);

  public setCapital = (
    coords: Coords,
  ): { readonly capitalChanged: boolean } => {
    const village = this.villageByCoords(coords);

    if (!village) {
      throw new Error(`No village at coords ${coords} was found`);
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
