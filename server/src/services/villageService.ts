import { Village } from '../_models/village';

export class VillageService {
  private _villages: readonly Village[] = [];
  private _currentVillageId: number;

  public hasVillage(villageId: number): boolean {
    const result = this._villages.find(village => village.id === villageId);
    return !!result;
  }

  public setVillages(villages: readonly Village[]): void {
    this._currentVillageId = villages[0].id;
    this._villages = villages;
  }

  public villages(): readonly Village[] {
    return this._villages;
  }

  public currentVillage() {
    return this._villages.find(village => village.id === this._currentVillageId);
  }
}
