import { AutoBuildSettings } from './tasks/AutoBuildSettings';
import { GeneralVillageSettings } from './GeneralVillageSettings';
import { AutoPartySettings } from './tasks/AutoPartySettings';
import { AutoUnitsSettings } from './tasks/AutoUnitsSettings';

interface IParams {
  general: GeneralVillageSettings;
  autoBuild: AutoBuildSettings;
  autoParty: AutoPartySettings;
  autoUnits: AutoUnitsSettings;
}

export class VillageSettings implements IParams {
  public general: GeneralVillageSettings = new GeneralVillageSettings();
  public autoBuild: AutoBuildSettings = new AutoBuildSettings();
  public autoParty: AutoPartySettings = new AutoPartySettings();
  public autoUnits: AutoUnitsSettings = new AutoUnitsSettings();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
