import { Village } from '../_models/village/village';

export class VillageService {
  private _villages: readonly Village[] = [];
  private _currentVillageId: number = 0;

  public getVillage = (villageId: number): Village | undefined => this._villages.find(village => village.id === villageId);

  public setVillages = (villages: readonly Village[]): void => {
    this._villages = villages;
  };

  public villages = (): readonly Village[] => this._villages;

  public currentVillage = (): Village => this._villages.find(village => village.id === this._currentVillageId);

  public currentVillageId = (): number => this._currentVillageId;

  public setActiveVillageId = (id: number): void => {
    this._currentVillageId = id;
  };
}
