import { GeneralVillageSettings } from '../../_models/settings/generalVillageSettings.js';
import { AutoBuildSettings } from '../../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../../_models/settings/tasks/autoPartySettings.js';
import { AutoSmithySettings } from '../../_models/settings/tasks/autoSmithySettings.js';
import { AutoUnitsSettings } from '../../_models/settings/tasks/autoUnitsSettings.js';
import type { VillageSettings } from '../../_models/settings/villageSettings.js';
import { dataPathService } from '../dataPathService.js';
import type { ComplexSettingsServiceType } from './_types.js';
import { InternalSettingsService } from './internalSettingsService.js';

export class VillageSettingsService implements ComplexSettingsServiceType<VillageSettings> {
  public autoBuild: InternalSettingsService<VillageSettings['autoBuild']>;
  public autoUnits: InternalSettingsService<VillageSettings['autoUnits']>;
  public autoParty: InternalSettingsService<VillageSettings['autoParty']>;
  public autoSmithy: InternalSettingsService<VillageSettings['autoSmithy']>;
  public general: InternalSettingsService<VillageSettings['general']>;

  constructor(accountId: string, villageId: string) {
    const villageSettingsPath = dataPathService.villagePath(
      accountId,
      villageId,
    ).settings;

    this.autoBuild = new InternalSettingsService(
      villageSettingsPath.autoBuild,
      AutoBuildSettings,
    );
    this.autoParty = new InternalSettingsService(
      villageSettingsPath.autoParty,
      AutoPartySettings,
    );
    this.autoUnits = new InternalSettingsService(
      villageSettingsPath.autoUnits,
      AutoUnitsSettings,
    );
    this.autoSmithy = new InternalSettingsService(
      villageSettingsPath.autoSmithy,
      AutoSmithySettings,
    );
    this.general = new InternalSettingsService(
      villageSettingsPath.general,
      GeneralVillageSettings,
    );
  }
}
