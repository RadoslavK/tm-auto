import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';

export class VillageCrannyCapacity {
  public readonly actual: number = 0;

  public readonly ongoing: number = 0;

  public readonly total: number = 0;

  constructor(params: PartialFields<VillageCrannyCapacity> = {}) {
    mergeDefaults(this, params);
  }

  public add = (other: VillageCrannyCapacity): VillageCrannyCapacity =>
    new VillageCrannyCapacity({
      actual: this.actual + other.actual,
      ongoing: this.ongoing + other.ongoing,
      total: this.total + other.total,
    });
}
