import { IVillageSettings } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import { Fields } from '../../../_shared/types';
import { GeneralVillageSettings } from './generalVillageSettings';
import { AutoBuildSettings } from './tasks/autoBuildSettings';
import { AutoPartySettings } from './tasks/autoPartySettings';
import { AutoUnitsSettings } from './tasks/autoUnitsSettings';

const getDefaults = (): Fields<VillageSettings> => ({
  autoBuild: new AutoBuildSettings(),
  autoParty: new AutoPartySettings(),
  autoUnits: new AutoUnitsSettings(),
  general: new GeneralVillageSettings(),
});

export class VillageSettings implements IVillageSettings {
  public general: GeneralVillageSettings;
  public autoBuild: AutoBuildSettings;
  public autoParty: AutoPartySettings;
  public autoUnits: AutoUnitsSettings;

  constructor(params: Partial<IVillageSettings> = {}) {
    Object.assign(this, merge(getDefaults, {
      ...params,
      autoBuild: params.autoBuild && new AutoBuildSettings(params.autoBuild),
      autoParty: params.autoParty && new AutoPartySettings(params.autoParty),
      autoUnits: params.autoUnits && new AutoUnitsSettings(params.autoUnits),
      general: params.general && new GeneralVillageSettings(params.general),
    }));
  }
}
