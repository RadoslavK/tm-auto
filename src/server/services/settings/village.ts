import { join } from "path";
import { ComplexSettingsServiceType } from './_types';
import { VillageSettings } from '../../_models/settings/VillageSettings';
import { InternalSettingsService } from './internalSettingsService';
import { AutoBuildSettings } from '../../_models/settings/tasks/AutoBuildSettings';
import { AutoPartySettings } from '../../_models/settings/tasks/AutoPartySettings';
import { AutoUnitsSettings } from '../../_models/settings/tasks/AutoUnitsSettings';
import { GeneralVillageSettings } from '../../_models/settings/GeneralVillageSettings';

export class VillageSettingsService implements ComplexSettingsServiceType<VillageSettings> {
  public autoBuild: InternalSettingsService<VillageSettings['autoBuild']>;
  public autoParty: InternalSettingsService<VillageSettings['autoParty']>;
  public autoUnits: InternalSettingsService<VillageSettings['autoUnits']>;
  public general: InternalSettingsService<VillageSettings['general']>;

  constructor(private villageId: number, private basePath: string) {
    const path = join(basePath, 'village', villageId.toString());

    this.autoBuild = new InternalSettingsService(AutoBuildSettings, join(path, 'autoBuild.json'));
    this.autoParty = new InternalSettingsService(AutoPartySettings, join(path, 'autoParty.json'));
    this.autoUnits = new InternalSettingsService(AutoUnitsSettings, join(path, 'autoUnits.json'));
    this.general = new InternalSettingsService(GeneralVillageSettings, join(path, 'general.json'));
  }

  public get = (): VillageSettings => ({
    autoBuild: this.autoBuild.get(),
    autoParty: this.autoParty.get(),
    autoUnits: this.autoUnits.get(),
    general: this.general.get(),
  });
}