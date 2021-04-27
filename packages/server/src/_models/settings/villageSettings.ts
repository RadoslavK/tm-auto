import type { GeneralVillageSettings } from './generalVillageSettings.js';
import type { AutoAcademySettings } from './tasks/autoAcademySettings.js';
import type { AutoBuildSettings } from './tasks/autoBuildSettings';
import type { AutoPartySettings } from './tasks/autoPartySettings.js';
import type { AutoSmithySettings } from './tasks/autoSmithySettings.js';
import type { AutoUnitsSettings } from './tasks/autoUnitsSettings.js';

export type VillageSettings = {
  readonly autoBuild: AutoBuildSettings;
  readonly autoParty: AutoPartySettings;
  readonly autoUnits: AutoUnitsSettings;
  readonly autoSmithy: AutoSmithySettings;
  readonly autoAcademy: AutoAcademySettings;
  readonly general: GeneralVillageSettings;
}
