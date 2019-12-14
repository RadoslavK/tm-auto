import { IVillageResources } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import { Fields } from '../../../_shared/types';
import { Resources } from '../misc/resources';
import { VillageCapacity } from './villageCapacity';

const getDefaults = (): Fields<VillageResources> => ({
  amount: new Resources(),
  capacity: new VillageCapacity(),
  production: new Resources(),
});

export class VillageResources implements IVillageResources {
  public amount: Resources;
  public capacity: VillageCapacity;
  public production: Resources;

  constructor(params: Partial<IVillageResources> = {}) {
    Object.assign(this, merge(getDefaults, {
      ...params,
      amount: params.amount && new Resources(params.amount),
      production: params.production && new Resources(params.production),
    }));
  }

  public warehouseFullness = (): number => this.amount.maxWarehouseRes() / this.capacity.warehouse;

  public granaryFullness = (): number => this.amount.crop / this.capacity.granary;
}
