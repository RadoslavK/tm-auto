import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { GeneralVillageSettings } from './generalVillageSettings.js';
import { AutoAcademySettings } from './tasks/autoAcademySettings.js';
import { AutoBuildSettings } from './tasks/autoBuildSettings';
import { AutoPartySettings } from './tasks/autoPartySettings.js';
import { AutoSmithySettings } from './tasks/autoSmithySettings.js';
import { AutoUnitsSettings } from './tasks/autoUnitsSettings.js';

export class VillageSettings {
  public readonly autoBuild: AutoBuildSettings = new AutoBuildSettings();
  public readonly autoParty: AutoPartySettings = new AutoPartySettings();
  public readonly autoUnits: AutoUnitsSettings = new AutoUnitsSettings();
  public readonly autoSmithy: AutoSmithySettings = new AutoSmithySettings();
  public readonly autoAcademy: AutoAcademySettings = new AutoAcademySettings();
  public readonly general: GeneralVillageSettings = new GeneralVillageSettings();

  constructor(params: PartialFields<VillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}
