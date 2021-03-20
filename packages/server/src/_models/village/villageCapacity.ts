import { mergeDefaults } from 'shared/utils/merge.js';
import type { PartialFields } from 'shared/types/fields.type.js';

export class VillageCapacity {
  public readonly granary: number = 0;

  public readonly warehouse: number = 0;

  constructor(params: PartialFields<VillageCapacity> = {}) {
    mergeDefaults(this, params);
  }
}
