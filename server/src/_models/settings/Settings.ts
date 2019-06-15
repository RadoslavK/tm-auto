import { GeneralSettings } from './GeneralSettings';
import { HeroSettings } from './HeroSettings';
import { VillageSettings } from './VillageSettings';

export class Settings {
  public general: GeneralSettings = new GeneralSettings();
  public hero: HeroSettings = new HeroSettings();

  private readonly _villageSettings: Record<number, VillageSettings> = {};

  public village = (villageId: number): VillageSettings => {
    let settings: VillageSettings = this._villageSettings[villageId];
    if (!settings) {
      settings = new VillageSettings();
      this._villageSettings[villageId] = settings;
    }

    return settings;
  };
}
