import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { Resources } from '../misc/resources.js';
import { VillageCapacity } from './villageCapacity.js';

export class VillageResources {
  public amount: Resources = new Resources();

  public capacity: VillageCapacity = new VillageCapacity();

  public production: Resources = new Resources();

  constructor(params: PartialFields<VillageResources> = {}) {
    mergeDefaults(this, params);
  }
}
