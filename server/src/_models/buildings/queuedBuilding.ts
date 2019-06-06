import { BuildingType } from '../../_enums/BuildingType';

interface IParams {
  fieldId: number;
  type: BuildingType;
}

export class QueuedBuilding implements IParams {
  fieldId: number = 0;
  type: BuildingType = BuildingType.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
