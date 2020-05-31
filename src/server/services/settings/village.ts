import { GeneralVillageSettings } from '../../_models/settings/generalVillageSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../../_models/settings/tasks/autoPartySettings';
import { AutoUnitsSettings } from '../../_models/settings/tasks/autoUnitsSettings';
import { VillageSettings } from '../../_models/settings/villageSettings';
import { dataPathService } from '../dataPathService';
import { ComplexSettingsServiceType } from './_types';
import { InternalSettingsService } from './internalSettingsService';

export class VillageSettingsService implements ComplexSettingsServiceType<VillageSettings> {
  public autoBuild: InternalSettingsService<VillageSettings['autoBuild']>;
  public autoParty: InternalSettingsService<VillageSettings['autoParty']>;
  public autoUnits: InternalSettingsService<VillageSettings['autoUnits']>;
  public general: InternalSettingsService<VillageSettings['general']>;

  constructor(villageId: number) {
    const villageSettingsPath = dataPathService.villagePath(villageId).settings;

    this.autoBuild = new InternalSettingsService(villageSettingsPath.autoBuild, AutoBuildSettings);
    this.autoParty = new InternalSettingsService(villageSettingsPath.autoParty, AutoPartySettings);
    this.autoUnits = new InternalSettingsService(villageSettingsPath.autoUnits, AutoUnitsSettings);
    this.general = new InternalSettingsService(villageSettingsPath.general, GeneralVillageSettings);
  }
}