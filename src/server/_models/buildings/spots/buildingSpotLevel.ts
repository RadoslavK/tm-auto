import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';

export class BuildingSpotLevel {
  public actual: number = 0;
  public ongoing: number = 0;
  public queued: number = 0;

  constructor(params: PartialFields<BuildingSpotLevel> = {}) {
    mergeDefaults(this, params);
  }

  public getTotal = (): number =>
    this.actual + this.ongoing + this.queued;
}