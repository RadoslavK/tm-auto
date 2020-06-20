import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';
import { BuildingType } from '../../enums/buildingType';

export class QueuedBuilding {
  public readonly fieldId: number = 0;

  public readonly level: number = 0;

  public readonly queueId: string = '';

  public readonly type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<QueuedBuilding> = {}) {
    mergeDefaults(this, params);
  }
}