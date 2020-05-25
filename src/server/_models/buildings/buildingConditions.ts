import { BuildingType } from '../../../_shared/types/buildingType';
import { Tribe } from '../../../_shared/types/tribe';

export enum CapitalCondition {
  None = 0,
  Prohibited = 1,
  Required = 2,
}

export type BuildingWithLevelRequirement = {
  readonly level: number;
  readonly type: BuildingType;
};

export type BuildingConditions = {
  readonly capital: CapitalCondition;
  readonly isUnique: boolean;
  readonly playerTribe: Tribe | null;
  readonly prohibitedBuildingTypes: readonly BuildingType[];
  readonly requiredBuildings: readonly BuildingWithLevelRequirement[];
};
