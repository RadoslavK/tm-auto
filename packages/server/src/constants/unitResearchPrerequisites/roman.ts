import { BuildingType } from 'shared/enums/BuildingType.js';

import type { UnitResearchPrerequisite } from '../unitResearchPrerequisites.js';

export const romanUnitResearchPrerequisites: ReadonlyMap<number, ReadonlyArray<UnitResearchPrerequisite>> = new Map<number, ReadonlyArray<UnitResearchPrerequisite>>([
  //  Praetorian
  [2, [
    { building: BuildingType.Smithy, level: 1 },
    { building: BuildingType.Academy, level: 1 },
  ]],
  //  Imperian
  [3, [
    { building: BuildingType.Smithy, level: 1 },
    { building: BuildingType.Academy, level: 5 },
  ]],
  //  Equites Legati
  [4, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 1 },
  ]],
  //  Equites Imperatoris
  [5, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 5 },
  ]],
  //  Equites Caesaris
  [6, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Stable, level: 10 },
  ]],
  //  Battering Ram
  [7, [
    { building: BuildingType.Academy, level: 10 },
    { building: BuildingType.Workshop, level: 1 },
  ]],
  //  Fire Catapult
  [8, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Workshop, level: 10 },
  ]],
  //  Senator
  [9, [
    { building: BuildingType.RallyPoint, level: 10 },
    { building: BuildingType.Academy, level: 20 },
  ]],
]);