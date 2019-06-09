import { BuildingType } from '../../_enums/BuildingType';
import { Tribe } from '../../_enums/Tribe';

export enum CapitalCondition {
  None = 0,
  Prohibited = 1,
  Required = 2,
}

export interface IBuildingWithLevelRequirement {
  readonly level: number;
  readonly type: BuildingType;
}

interface IParams {
  readonly capital: CapitalCondition;
  readonly isUnique: boolean;
  readonly playerTribe: Tribe;
  readonly requiredBuildings: readonly IBuildingWithLevelRequirement[];
  readonly prohibitedBuildingTypes: readonly BuildingType[];
  readonly type: BuildingType;
}

export class BuildingConditions {
  public readonly capital: CapitalCondition = CapitalCondition.None;
  public readonly isUnique: boolean = true;
  public readonly playerTribe: Tribe = Tribe.None;
  public readonly requiredBuildings: readonly IBuildingWithLevelRequirement[] = [];
  public readonly prohibitedBuildingTypes: readonly BuildingType[] = [];
  public readonly type: BuildingType = BuildingType.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
