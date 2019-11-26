import { BuildingType } from '../../_enums/BuildingType';
import { ITribe } from '../../_types/graphql';

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
  readonly playerTribe: ITribe | null;
  readonly requiredBuildings: readonly IBuildingWithLevelRequirement[];
  readonly prohibitedBuildingTypes: readonly BuildingType[];
}
