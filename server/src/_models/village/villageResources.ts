import { Resources } from '../misc/resources';
import { VillageCapacity } from './villageCapacity';

interface IParams {
  amount: Resources;
  capacity: VillageCapacity;
  production: Resources;
}

export class VillageResources implements IParams {
  public amount: Resources = new Resources();
  public capacity: VillageCapacity = new VillageCapacity();
  public production: Resources = new Resources();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
