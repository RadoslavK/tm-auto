import { GeneralVillageSettings } from '../../_models/settings/generalVillageSettings.js';
import { AutoAcademySettings } from '../../_models/settings/tasks/autoAcademySettings.js';
import { AutoBuildSettings } from '../../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../../_models/settings/tasks/autoPartySettings.js';
import { AutoSmithySettings } from '../../_models/settings/tasks/autoSmithySettings.js';
import { AutoUnitsSettings } from '../../_models/settings/tasks/autoUnitsSettings.js';
import type { VillageSettings } from '../../_models/settings/villageSettings.js';
import { AccountContext } from '../../accountContext.js';
import { dataPathService } from '../dataPathService.js';
import type { ComplexSettingsServiceType } from './_types.js';
import { InternalSettingsService } from './internalSettingsService.js';

export class VillageSettingsService implements ComplexSettingsServiceType<VillageSettings> {
  public autoBuild: InternalSettingsService<VillageSettings['autoBuild']>;
  public autoUnits: InternalSettingsService<VillageSettings['autoUnits']>;
  public autoParty: InternalSettingsService<VillageSettings['autoParty']>;
  public autoSmithy: InternalSettingsService<VillageSettings['autoSmithy']>;
  public autoAcademy: InternalSettingsService<VillageSettings['autoAcademy']>;
  public general: InternalSettingsService<VillageSettings['general']>;

  constructor(accountId: string, villageId: string) {
    const villageSettingsPath = dataPathService.villagePath(
      accountId,
      villageId,
    ).settings;

    const { tribe } = AccountContext.getContext().villageService.village(villageId);

    this.autoBuild = new InternalSettingsService(
      villageSettingsPath.autoBuild,
      params => new AutoBuildSettings(params),
    );
    this.autoParty = new InternalSettingsService(
      villageSettingsPath.autoParty,
      params => new AutoPartySettings(params),
    );
    this.autoUnits = new InternalSettingsService(
      villageSettingsPath.autoUnits,
      params => new AutoUnitsSettings(params, tribe),
    );
    this.autoSmithy = new InternalSettingsService(
      villageSettingsPath.autoSmithy,
      params => new AutoSmithySettings(params),
    );
    this.autoAcademy = new InternalSettingsService(
      villageSettingsPath.autoAcademy,
      params => new AutoAcademySettings(params),
    );
    this.general = new InternalSettingsService(
      villageSettingsPath.general,
      params => new GeneralVillageSettings(params),
    );
  }
}
