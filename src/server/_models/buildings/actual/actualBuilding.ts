import { mergeDefaults } from '../../../../_shared/merge';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { PartialFields } from '../../../../_shared/types/fields.type';

export class ActualBuilding {
  public fieldId: number = 0;
  public level: number = 0;
  public type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<ActualBuilding> = {}) {
    mergeDefaults(this, params);
  }
}