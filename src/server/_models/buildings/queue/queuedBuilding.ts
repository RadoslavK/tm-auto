import { mergeDefaults } from '../../../../_shared/merge';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { PartialFields } from '../../../../_shared/types/fields.type';

export class QueuedBuilding {
  public readonly fieldId: number = 0;
  public readonly level: number = 0;
  public readonly queueId: string = '';
  public readonly type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<QueuedBuilding> = {}) {
    mergeDefaults(this, params);
  }
}