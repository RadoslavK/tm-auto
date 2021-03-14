import { BuildingType } from '../../../../../_shared/enums/BuildingType';
import { mergeDefaults } from '../../../../../_shared/merge';
import { PartialFields } from '../../../../../_shared/types/fields.type';
import { BuildingSpotLevel } from './buildingSpotLevel';

export class BuildingSpot {
  public fieldId: number = 0;

  public level: BuildingSpotLevel = new BuildingSpotLevel();

  public type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<BuildingSpot> = {}) {
    mergeDefaults(this, params);
  }

  public isBuilt = (): boolean => this.level.actual > 0;
}
