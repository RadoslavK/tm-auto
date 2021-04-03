import { BuildingType } from 'shared/enums/BuildingType.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class QueuedBuilding {
  public readonly id: string = '';

  public readonly villageId: string = '';

  public readonly fieldId: number = 0;

  public startingLevel: number = 0;

  public targetLevel: number = 0;

  public readonly type: BuildingType = BuildingType.None;

  constructor(params: PartialFields<QueuedBuilding> = {}) {
    mergeDefaults(this, params);
  }
}
