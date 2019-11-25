import { ComplexSettingsServiceType } from './_types';
import { VillageSettings } from '../../_models/settings/VillageSettings';
import { InternalSettingsService } from './internalSettingsService';
import { AutoBuildSettings } from '../../_models/settings/tasks/AutoBuildSettings';
import { AutoPartySettings } from '../../_models/settings/tasks/AutoPartySettings';
import { AutoUnitsSettings } from '../../_models/settings/tasks/AutoUnitsSettings';
import { GeneralVillageSettings } from '../../_models/settings/GeneralVillageSettings';
import { dataPathService } from '../dataPathService';

export class VillageSettingsService implements ComplexSettingsServiceType<VillageSettings> {
  public autoBuild: InternalSettingsService<VillageSettings['autoBuild']>;
  public autoParty: InternalSettingsService<VillageSettings['autoParty']>;
  public autoUnits: InternalSettingsService<VillageSettings['autoUnits']>;
  public general: InternalSettingsService<VillageSettings['general']>;

  constructor(private villageId: number) {
    const villageSettingsPath = dataPathService.villagePath(villageId).settings;

    this.autoBuild = new InternalSettingsService(AutoBuildSettings, villageSettingsPath.autoBuild);
    this.autoParty = new InternalSettingsService(AutoPartySettings, villageSettingsPath.autoParty);
    this.autoUnits = new InternalSettingsService(AutoUnitsSettings, villageSettingsPath.autoUnits);
    this.general = new InternalSettingsService(GeneralVillageSettings, villageSettingsPath.general);
  }

  public get = (): VillageSettings => ({
    autoBuild: this.autoBuild.get(),
    autoParty: this.autoParty.get(),
    autoUnits: this.autoUnits.get(),
    general: this.general.get(),
  });
}