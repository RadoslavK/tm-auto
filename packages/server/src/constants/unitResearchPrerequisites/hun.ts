import { BuildingType } from 'shared/enums/BuildingType.js';

import type { UnitResearchPrerequisite } from '../unitResearchPrerequisites.js';

export const hunUnitResearchPrerequisites: ReadonlyMap<number, ReadonlyArray<UnitResearchPrerequisite>> = new Map<number, ReadonlyArray<UnitResearchPrerequisite>>([
  //  Bowman
  [62, [
    { building: BuildingType.Smithy, level: 1 },
    { building: BuildingType.Academy, level: 3 },
  ]],
  //  Spotter
  [63, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 1 },
  ]],
  //  Steppe Rider
  [64, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 3 },
  ]],
  //  Marksman
  [65, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 5 },
  ]],
  //  Marauder
  [66, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Stable, level: 10 },
  ]],
  //  Ram
  [67, [
    { building: BuildingType.Academy, level: 10 },
    { building: BuildingType.Workshop, level: 1 },
  ]],
  //  Catapult
  [68, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Workshop, level: 10 },
  ]],
]);