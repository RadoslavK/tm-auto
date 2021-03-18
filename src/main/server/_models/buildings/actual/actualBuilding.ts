import { BuildingType } from '../../../../../_shared/enums/BuildingType.js';
import { mergeDefaults } from '../../../../../_shared/merge.js';
import { PartialFields } from '../../../../../_shared/types/fields.type.js';

export class ActualBuilding {
  public fieldId: number = 0;

  public level: number = 0;

  public type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<ActualBuilding> = {}) {
    mergeDefaults(this, params);
  }
}
