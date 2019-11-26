import {
  AutoBuildSettings,
  IAutoBuildSettingsParams,
} from './tasks/AutoBuildSettings';
import {
  GeneralVillageSettings,
  IGeneralVillageSettingsParams,
} from './GeneralVillageSettings';
import {
  AutoPartySettings,
  IAutoPartySettingsParams,
} from './tasks/AutoPartySettings';
import {
  AutoUnitsSettings,
  IAutoUnitsSettingsParams,
} from './tasks/AutoUnitsSettings';
import { Fields } from '../../../_shared/types';
import { merge } from '../../../_shared/merge';

interface IVillageSettingsParams {
  readonly general: IGeneralVillageSettingsParams;
  readonly autoBuild: IAutoBuildSettingsParams;
  readonly autoParty: IAutoPartySettingsParams;
  readonly autoUnits: IAutoUnitsSettingsParams;
}

const defaults: Fields<VillageSettings> = {
  general: new GeneralVillageSettings(),
  autoBuild: new AutoBuildSettings(),
  autoParty: new AutoPartySettings(),
  autoUnits: new AutoUnitsSettings(),
};

export class VillageSettings implements IVillageSettingsParams {
  public general: GeneralVillageSettings;
  public autoBuild: AutoBuildSettings;
  public autoParty: AutoPartySettings;
  public autoUnits: AutoUnitsSettings;

  constructor(params: Partial<IVillageSettingsParams> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      general: params.general && new GeneralVillageSettings(params.general),
      autoBuild: params.autoBuild && new AutoBuildSettings(params.autoBuild),
      autoUnits: params.autoUnits && new AutoUnitsSettings(params.autoUnits),
      autoParty: params.autoParty && new AutoPartySettings(params.autoParty),
    }));
  }
}
