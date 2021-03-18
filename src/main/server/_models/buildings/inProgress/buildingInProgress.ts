import { BuildingType } from '../../../../../_shared/enums/BuildingType.js';
import { mergeDefaults } from '../../../../../_shared/merge.js';
import { PartialFields } from '../../../../../_shared/types/fields.type.js';

export class BuildingInProgress {
  public readonly fieldId: number = 0;

  public readonly finishedAt: Date = new Date();

  public readonly level: number = 0;

  public readonly type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<BuildingInProgress> = {}) {
    mergeDefaults(this, params);
  }
}
