import { IVillage } from '../_types/graphql';

export class VillageService {
  private _villages: readonly IVillage[] = [];

  public hasVillage(villageId: string): boolean {
    const result = this._villages.find(village => village.id === villageId);
    return !!result;
  }

  public setVillages(villages: readonly IVillage[]): void {
    this._villages = villages;
  }

  public getVillages(): readonly IVillage[] {
    return this._villages;
  }
}
