import { BuildingType } from 'shared/enums/BuildingType.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class QueuedBuilding {
  public readonly fieldId: number = 0;

  public readonly level: number = 0;

  public readonly queueId: string = '';

  public readonly type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<QueuedBuilding> = {}) {
    mergeDefaults(this, params);
  }
}
