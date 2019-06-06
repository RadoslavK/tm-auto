import { Village } from '../_models/village';

export class VillageService {
  private _villages: readonly Village[] = [];

  public hasVillage(villageId: number): boolean {
    const result = this._villages.find(village => village.id === villageId);
    return !!result;
  }

  public setVillages(villages: readonly Village[]): void {
    this._villages = villages;
  }

  public getVillages(): readonly Village[] {
    return this._villages;
  }
}
