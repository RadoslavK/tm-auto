import { BuildingType } from 'shared/enums/BuildingType.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class ActualBuilding {
  public fieldId: number = 0;

  public level: number = 0;

  public type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<ActualBuilding> = {}) {
    mergeDefaults(this, params);
  }
}
