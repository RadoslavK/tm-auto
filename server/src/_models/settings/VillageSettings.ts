import { AutoBuildSettings } from './tasks/AutoBuildSettings';
import { GeneralVillageSettings } from './GeneralVillageSettings';
import { AutoUnitsSettings } from './tasks/AutoUnitsSettings';

interface IParams {
  general: GeneralVillageSettings;
  autoBuild: AutoBuildSettings;
  autoUnits: AutoUnitsSettings;
}

export class VillageSettings implements IParams {
  public general: GeneralVillageSettings = new GeneralVillageSettings();
  public autoBuild: AutoBuildSettings = new AutoBuildSettings();
  public autoUnits: AutoUnitsSettings = new AutoUnitsSettings();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
