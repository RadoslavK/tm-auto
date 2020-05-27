import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';

export class VillageCapacity {
  public readonly granary: number = 0;
  public readonly warehouse: number = 0;

  constructor(params: PartialFields<VillageCapacity> = {}) {
    mergeDefaults(this, params);
  }
}