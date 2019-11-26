import { IVillageCapacity } from '../../_types/graphql';
import { Fields } from '../../../_shared/types';
import { merge } from '../../../_shared/merge';

const defaults: Fields<VillageCapacity> = {
  granary: 0,
  warehouse: 0,
};

export class VillageCapacity implements IVillageCapacity {
  public granary: number;
  public warehouse: number;

  constructor(params: Partial<IVillageCapacity> = {}) {
    Object.assign(this, merge(defaults, params));
  }
}
