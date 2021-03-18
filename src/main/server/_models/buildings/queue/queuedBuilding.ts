import { BuildingType } from '../../../../../_shared/enums/BuildingType.js';
import { mergeDefaults } from '../../../../../_shared/merge.js';
import { PartialFields } from '../../../../../_shared/types/fields.type.js';

export class QueuedBuilding {
  public readonly fieldId: number = 0;

  public readonly level: number = 0;

  public readonly queueId: string = '';

  public readonly type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<QueuedBuilding> = {}) {
    mergeDefaults(this, params);
  }
}
