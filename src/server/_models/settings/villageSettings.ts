import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { GeneralVillageSettings } from './generalVillageSettings';
import { AutoBuildSettings } from './tasks/autoBuildSettings';
import { AutoPartySettings } from './tasks/autoPartySettings';
import { AutoUnitsSettings } from './tasks/autoUnitsSettings';

export class VillageSettings {
  public readonly autoBuild: AutoBuildSettings = new AutoBuildSettings();

  public readonly autoParty: AutoPartySettings = new AutoPartySettings();

  public readonly autoUnits: AutoUnitsSettings = new AutoUnitsSettings();

  public readonly general: GeneralVillageSettings = new GeneralVillageSettings();

  constructor(params: PartialFields<VillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}