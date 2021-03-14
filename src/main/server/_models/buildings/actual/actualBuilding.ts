import { BuildingType } from '../../../../../_shared/enums/BuildingType';
import { mergeDefaults } from '../../../../../_shared/merge';
import { PartialFields } from '../../../../../_shared/types/fields.type';

export class ActualBuilding {
  public fieldId: number = 0;

  public level: number = 0;

  public type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<ActualBuilding> = {}) {
    mergeDefaults(this, params);
  }
}
