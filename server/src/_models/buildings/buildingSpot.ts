import { BuildingType } from '../../_enums/BuildingType';

interface IParams {
  fieldId: number;
  level: number;
  type: BuildingType;
}

export class BuildingSpot {
  public fieldId: number = 0;
  public level: number = 0;
  public type: BuildingType = BuildingType.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
