import { mergeDefaults } from 'shared/utils/merge.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { GeneralVillageSettings } from './generalVillageSettings.js';
import { AutoBuildSettings } from './tasks/autoBuildSettings';
import { AutoPartySettings } from './tasks/autoPartySettings.js';
import { AutoUnitsSettings } from './tasks/autoUnitsSettings.js';

export class VillageSettings {
  public readonly autoBuild: AutoBuildSettings = new AutoBuildSettings();

  public readonly autoParty: AutoPartySettings = new AutoPartySettings();

  public readonly autoUnits: AutoUnitsSettings = new AutoUnitsSettings();

  public readonly general: GeneralVillageSettings = new GeneralVillageSettings();

  constructor(params: PartialFields<VillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}
