import { BuildingType } from 'shared/enums/BuildingType.js';

import type { UnitResearchPrerequisite } from '../unitResearchPrerequisites.js';

export const teutonUnitResearchPrerequisites: ReadonlyMap<number, ReadonlyArray<UnitResearchPrerequisite>> = new Map<number, ReadonlyArray<UnitResearchPrerequisite>>([
  //  Spearman
  [12, [
    { building: BuildingType.Barracks, level: 3 },
    { building: BuildingType.Academy, level: 1 },
  ]],
  //  Axeman
  [13, [
    { building: BuildingType.Academy, level: 3 },
    { building: BuildingType.Smithy, level: 1 },
  ]],
  //  Scout
  [14, [
    { building: BuildingType.MainBuilding, level: 5 },
    { building: BuildingType.Academy, level: 1 },
  ]],
  //  Paladin
  [15, [
    { building: BuildingType.Academy, level: 5 },
    { building: BuildingType.Stable, level: 3 },
  ]],
  //  Teutonic Knight
  [16, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Stable, level: 10 },
  ]],
  //  Ram
  [17, [
    { building: BuildingType.Academy, level: 10 },
    { building: BuildingType.Workshop, level: 1 },
  ]],
  //  Catapult
  [18, [
    { building: BuildingType.Academy, level: 15 },
    { building: BuildingType.Workshop, level: 10 },
  ]],
  //  Chief
  [19, [
    { building: BuildingType.RallyPoint, level: 5 },
    { building: BuildingType.Academy, level: 20 },
  ]],
]);