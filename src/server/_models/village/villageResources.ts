import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { Resources } from '../misc/resources';
import { VillageCapacity } from './villageCapacity';

export class VillageResources {
  public amount: Resources = new Resources();

  public capacity: VillageCapacity = new VillageCapacity();

  public production: Resources = new Resources();

  constructor(params: PartialFields<VillageResources> = {}) {
    mergeDefaults(this, params);
  }
}