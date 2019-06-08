import { BuildingType } from '../../_enums/BuildingType';

interface IParams {
  fieldId: number;
  level: number;
  type: BuildingType;
  queueId: string;
}

export class QueuedBuilding implements IParams {
  fieldId: number = 0;
  level: number = 0;
  type: BuildingType = BuildingType.None;
  queueId: string = '';

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
