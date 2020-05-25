import { BuildingType } from '../../../../_shared/types/buildingType';
import { BuildingLevel } from '../buildingLevel';

type Params = {
  readonly fieldId: number;
  level: BuildingLevel;
  type: BuildingType;
};

export class BuildingSpot implements Params {
  public readonly fieldId: number = 0;
  public level: BuildingLevel = new BuildingLevel();
  public type: BuildingType = BuildingType.None;

  constructor(params: Partial<Params> = {}) {
    Object.assign(this, params);
  }

  public isBuilt = (): boolean => this.level.actual > 0;
}
