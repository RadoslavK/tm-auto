import { BuildingType } from 'shared/enums/BuildingType.js';
import { mergeDefaults } from 'shared/utils/merge.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { BuildingSpotLevel } from './buildingSpotLevel.js';

export class BuildingSpot {
  public fieldId: number = 0;

  public level: BuildingSpotLevel = new BuildingSpotLevel();

  public type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<BuildingSpot> = {}) {
    mergeDefaults(this, params);
  }

  public isBuilt = (): boolean => this.level.actual > 0;
}
