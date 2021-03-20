import { mergeDefaults } from 'shared/utils/merge.js';
import type { PartialFields } from 'shared/types/fields.type.js';

export class BuildingSpotLevel {
  public actual: number = 0;

  public ongoing: number | undefined = undefined;

  public queued: number | undefined = undefined;

  constructor(params: PartialFields<BuildingSpotLevel> = {}) {
    mergeDefaults(this, params);
  }

  public getActualAndOngoing = (): number => this.ongoing || this.actual;

  public getTotal = (): number => this.queued || this.ongoing || this.actual;
}
