import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';

export class BuildingSpotLevel {
  public actual: number = 0;
  public ongoing: number | null = null;
  public queued: number | null = null;

  constructor(params: PartialFields<BuildingSpotLevel> = {}) {
    mergeDefaults(this, params);
  }

  public getActualAndOngoing = (): number =>
    this.ongoing || this.actual;

  public getTotal = (): number =>
    this.queued || this.ongoing || this.actual;
}