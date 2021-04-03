import { BuildingType } from 'shared/enums/BuildingType.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class BuildingInProgress {
  public readonly fieldId: number = 0;

  public readonly finishedAt: Date = new Date();

  public readonly level: number = 0;

  public readonly type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<BuildingInProgress> = {}) {
    mergeDefaults(this, params);
  }
}
