import type { BuildingType } from 'shared/enums/BuildingType.js';

import type { Tribe } from '../enums/tribe.js';

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
