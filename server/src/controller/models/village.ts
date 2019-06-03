import { IBuilding } from './buildings/building';

export interface IVillage {
  id: number;
  name: string;
  buildings: readonly IBuilding[];
}

export class Village implements IVillage {
  id: number = 0;
  name: string = '';
  buildings: readonly IBuilding[] = [];

  constructor(params: Partial<IVillage> = {}) {
    Object.assign(this, params);
  }
}
