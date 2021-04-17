import { BuildingType } from 'shared/enums/BuildingType.js';

import type { UnitResearchPrerequisite } from '../unitResearchPrerequisites.js';

export const gaulUnitResearchPrerequisites: ReadonlyMap<number, ReadonlyArray<UnitResearchPrerequisite>> = new Map<number, ReadonlyArray<UnitResearchPrerequisite>>([
  //  Swordsman
  [22, [
    { building: BuildingType.Smithy, level: 1 },
    { building: BuildingType.Academy, level: 3   },
  ]],
  //  Pathfinder
  [23, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 1 },
  ]],
  //  Theutates Thunder
  [24, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 3 },
  ]],
  //  Druidrider
  [25, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 5 },
  ]],
  //  Haeduan
  [26, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Stable, level: 10 },
  ]],
  //  Ram
  [27, [
    { building: BuildingType.Academy, level: 10 },
    { building: BuildingType.Workshop, level: 1 },
  ]],
  //  Trebuchet
  [28, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Workshop, level: 10 },
  ]],
]);