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

export class BuildingConditions implements IParams {
  readonly capital: CapitalCondition = CapitalCondition.None;
  readonly isUnique: boolean = true;
  readonly playerTribe: Tribe = Tribe.None;
  readonly requiredBuildings: readonly IBuildingWithLevelRequirement[] = [];
  readonly prohibitedBuildingTypes: readonly BuildingType[] = [];
  readonly type: BuildingType = BuildingType.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
