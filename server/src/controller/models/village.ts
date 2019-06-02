import { IBuilding } from '../../../../_shared/contract/models/buildings/IBuilding';
import { IVillage } from '../../../../_shared/contract/models/IVillage';

export class Village implements IVillage {
  readonly id: number = 0;
  readonly name: string = '';
  readonly buildings: readonly IBuilding[] = [];

  constructor(params: Partial<IVillage> = {}) {
    Object.assign(this, params);
  }
}
