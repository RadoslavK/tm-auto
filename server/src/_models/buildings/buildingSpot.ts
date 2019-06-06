import { BuildingType } from '../../_enums/BuildingType';

interface IParams {
  level: number;
  type: BuildingType;
}

export class BuildingSpot implements IParams {
  level: number = 0;
  type: BuildingType = BuildingType.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
