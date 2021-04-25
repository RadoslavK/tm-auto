import { BuildingType } from 'shared/enums/BuildingType.js';

import type { UnitResearchPrerequisite } from '../unitResearchPrerequisites.js';

export const egyptianUnitResearchPrerequisites: ReadonlyMap<number, ReadonlyArray<UnitResearchPrerequisite>> = new Map<number, ReadonlyArray<UnitResearchPrerequisite>>([
  //  Ash Warden
  [52, [
    { building: BuildingType.Smithy, level: 1 },
    { building: BuildingType.Academy, level: 1 },
  ]],
  //  Khopesh Warrior
  [53, [
    { building: BuildingType.Smithy, level: 1 },
    { building: BuildingType.Academy, level: 5 },
  ]],
  //  Sopdu Explorer
  [54, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 1 },
  ]],
  //  Anhur Guard
  [55, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 5 },
  ]],
  //  Resheph Chariot
  [56, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Stable, level: 10 },
  ]],
  //  Ram
  [57, [
    { building: BuildingType.Academy, level: 10 },
    { building: BuildingType.Workshop, level: 1 },
  ]],
  //  Stone Catapult
  [58, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Workshop, level: 10 },
  ]],
  //  Nomarch
  [59, [
    { building: BuildingType.RallyPoint, level: 10 },
    { building: BuildingType.Academy, level: 20 },
  ]],
]);