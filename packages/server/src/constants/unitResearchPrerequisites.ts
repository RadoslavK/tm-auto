import type { BuildingType } from 'shared/enums/BuildingType.js';

import { egyptianUnitResearchPrerequisites } from './unitResearchPrerequisites/egyptian.js';
import { gaulUnitResearchPrerequisites } from './unitResearchPrerequisites/gaul.js';
import { hunUnitResearchPrerequisites } from './unitResearchPrerequisites/hun.js';
import { romanUnitResearchPrerequisites } from './unitResearchPrerequisites/roman.js';
import { teutonUnitResearchPrerequisites } from './unitResearchPrerequisites/teuton.js';

export type UnitResearchPrerequisite = {
  readonly building: BuildingType;
  readonly level: number;
};

export const unitResearchPrerequisites: ReadonlyMap<number, ReadonlyArray<UnitResearchPrerequisite>> = new Map<number, ReadonlyArray<UnitResearchPrerequisite>>([
  ...romanUnitResearchPrerequisites,
  ...teutonUnitResearchPrerequisites,
  ...gaulUnitResearchPrerequisites,
  ...egyptianUnitResearchPrerequisites,
  ...hunUnitResearchPrerequisites,
]);