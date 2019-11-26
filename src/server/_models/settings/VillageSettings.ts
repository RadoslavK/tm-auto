import {
  AutoBuildSettings,
} from './tasks/AutoBuildSettings';
import {
  GeneralVillageSettings,
} from './GeneralVillageSettings';
import {
  AutoPartySettings,
} from './tasks/AutoPartySettings';
import {
  AutoUnitsSettings,
} from './tasks/AutoUnitsSettings';
import { Fields } from '../../../_shared/types';
import { merge } from '../../../_shared/merge';
import { IVillageSettings } from '../../_types/graphql';

const defaults: Fields<VillageSettings> = {
  general: new GeneralVillageSettings(),
  autoBuild: new AutoBuildSettings(),
  autoParty: new AutoPartySettings(),
  autoUnits: new AutoUnitsSettings(),
};

export class VillageSettings implements IVillageSettings {
  public general: GeneralVillageSettings;
  public autoBuild: AutoBuildSettings;
  public autoParty: AutoPartySettings;
  public autoUnits: AutoUnitsSettings;

  constructor(params: Partial<IVillageSettings> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      general: params.general && new GeneralVillageSettings(params.general),
      autoBuild: params.autoBuild && new AutoBuildSettings(params.autoBuild),
      autoUnits: params.autoUnits && new AutoUnitsSettings(params.autoUnits),
      autoParty: params.autoParty && new AutoPartySettings(params.autoParty),
    }));
  }
}
