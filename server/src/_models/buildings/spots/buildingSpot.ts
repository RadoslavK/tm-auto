import { BuildingType } from '../../../_enums/BuildingType';
import { BuildingLevel } from '../buildingLevel';

interface IParams {
  readonly fieldId: number;
  level: BuildingLevel;
  type: BuildingType;
}

export class BuildingSpot implements IParams {
  public readonly fieldId: number = 0;
  public level: BuildingLevel = new BuildingLevel();
  public type: BuildingType = BuildingType.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
