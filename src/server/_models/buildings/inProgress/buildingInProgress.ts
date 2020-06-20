import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';
import { BuildingType } from '../../enums/buildingType';

export class BuildingInProgress {
  public readonly fieldId: number = 0;

  public readonly finishedAt: Date = new Date();

  public readonly level: number = 0;

  public readonly type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<BuildingInProgress> = {}) {
    mergeDefaults(this, params);
  }
}