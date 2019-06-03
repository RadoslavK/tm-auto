import { IBuilding, IVillage } from '../_types/graphql';

export class Village implements IVillage {
  id: string = '';
  name: string = '';
  buildings: IBuilding[] = [];

  constructor(params: Partial<IVillage> = {}) {
    Object.assign(this, params);
  }
}
