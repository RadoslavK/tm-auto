import { IBuilding } from './buildings/building';

interface IParams {
  readonly name: string;
  readonly buildings: readonly IBuilding[];
}

interface IVillage extends IParams {
}

export class Village implements IVillage {
  readonly name: string = '';
  readonly buildings: readonly IBuilding[] = [];

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
