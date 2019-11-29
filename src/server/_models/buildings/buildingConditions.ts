import { BuildingType } from '../../../_shared/types/buildingType';
import { Tribe } from '../../../_shared/types/tribe';

export enum CapitalCondition {
  None = 0,
  Prohibited = 1,
  Required = 2,
}

export interface IBuildingWithLevelRequirement {
  readonly level: number;
  readonly type: BuildingType;
}

export interface IBuildingConditions {
  readonly capital: CapitalCondition;
  readonly isUnique: boolean;
  readonly playerTribe: Tribe | null;
  readonly requiredBuildings: readonly IBuildingWithLevelRequirement[];
  readonly prohibitedBuildingTypes: readonly BuildingType[];
}
