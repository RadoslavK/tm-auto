import { IQueuedBuilding } from '../../_types/graphql';

export class QueuedBuilding implements IQueuedBuilding {
  fieldId: number = 0;
  buildingType: number = 0;

  constructor(params: Partial<IQueuedBuilding> = {}) {
    Object.assign(this, params);
  }
}
