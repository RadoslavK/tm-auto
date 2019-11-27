import { GeneralVillageSettings } from '../../_models/settings/generalVillageSettings';
import { AutoBuildSettings } from '../../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../../_models/settings/tasks/autoPartySettings';
import { AutoUnitsSettings } from '../../_models/settings/tasks/autoUnitsSettings';
import { VillageSettings } from '../../_models/settings/villageSettings';
import { IVillageSettings } from '../../_types/graphql';
import { dataPathService } from '../dataPathService';
import { ComplexSettingsServiceType } from './_types';
import { InternalSettingsService } from './internalSettingsService';

export class VillageSettingsService implements ComplexSettingsServiceType<IVillageSettings, VillageSettings> {
  public autoBuild: InternalSettingsService<IVillageSettings['autoBuild'], VillageSettings['autoBuild']>;
  public autoParty: InternalSettingsService<IVillageSettings['autoParty'], VillageSettings['autoParty']>;
  public autoUnits: InternalSettingsService<IVillageSettings['autoUnits'], VillageSettings['autoUnits']>;
  public general: InternalSettingsService<IVillageSettings['general'], VillageSettings['general']>;

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