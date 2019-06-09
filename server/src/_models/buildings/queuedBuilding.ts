import { BuildingType } from '../../_enums/BuildingType';

interface IParams {
  fieldId: number;
  level: number;
  type: BuildingType;
  queueId: string;
}

export class QueuedBuilding {
  public fieldId: number = 0;
  public level: number = 0;
  public type: BuildingType = BuildingType.None;
  public queueId: string = '';

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
