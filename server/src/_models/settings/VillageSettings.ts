import { AutoBuildSettings } from './tasks/AutoBuildSettings';
import { GeneralVillageSettings } from './GeneralVillageSettings';

interface IParams {
  general: GeneralVillageSettings;
  autoBuild: AutoBuildSettings;
}

export class VillageSettings implements IParams {
  public general: GeneralVillageSettings = new GeneralVillageSettings();
  public autoBuild: AutoBuildSettings = new AutoBuildSettings();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
