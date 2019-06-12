import { Village } from './village';

export class Villages {
  public currentVillageId: number;
  private readonly _villages: Record<number, Village> = {};

  public all = (): readonly Village[] => Object.values(this._villages);

  public village = (villageId = this.currentVillageId): Village => this._villages[villageId];

  public set = (villages: readonly Village[]): void => {
    villages.forEach(village => {
      this._villages[village.id] = village;
    });
  };
}
