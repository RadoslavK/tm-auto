import { IBuilding } from './buildings/IBuilding';

export interface IVillage {
  readonly id: number;
  readonly name: string;
  readonly buildings: readonly IBuilding[];
}
