import { BuildingType } from '../../_enums/BuildingType';
import { Fields } from '../../../_shared/types';
import { merge } from '../../../_shared/merge';

export enum CapitalCondition {
  None = 0,
  Prohibited = 1,
  Required = 2,
}

export interface IBuildingWithLevelRequirement {
  readonly level: number;
  readonly type: BuildingType;
}

// TODO replace playerTribe index with Tribe | null kde 0 = null

export interface IBuildingConditionsIParams {
  readonly capital: CapitalCondition;
  readonly isUnique: boolean;
  readonly playerTribe: number;
  readonly requiredBuildings: readonly IBuildingWithLevelRequirement[];
  readonly prohibitedBuildingTypes: readonly BuildingType[];
  readonly type: BuildingType;
}

const defaults: Fields<BuildingConditions> = {
  capital: CapitalCondition.None,
  isUnique: true,
  playerTribe: 0,
  requiredBuildings: [],
  prohibitedBuildingTypes: [],
  type: BuildingType.None,
};

export class BuildingConditions implements IBuildingConditionsIParams {
  public readonly capital: CapitalCondition = CapitalCondition.None;
  public readonly isUnique: boolean = true;
  public readonly playerTribe: number = 0;
  public readonly requiredBuildings: readonly IBuildingWithLevelRequirement[] = [];
  public readonly prohibitedBuildingTypes: readonly BuildingType[] = [];
  public readonly type: BuildingType = BuildingType.None;

  constructor(params: Partial<IBuildingConditionsIParams> = {}) {
    Object.assign(this, merge(defaults, params));
  }
}
