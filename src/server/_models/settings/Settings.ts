import { GeneralSettings } from './GeneralSettings';
import { HeroSettings } from './HeroSettings';
import { VillageSettings } from './VillageSettings';
import { AutoAdventureSettings } from './tasks/AutoAdventureSettings';

export class Settings {
  public general: GeneralSettings;
  public hero: HeroSettings;

  private readonly m_villageSettings: Record<number, VillageSettings> = {};

  constructor(generalSettings: GeneralSettings, autoAdventureSettings: AutoAdventureSettings) {
    this.general = generalSettings;
    this.hero = new HeroSettings({ autoAdventure: autoAdventureSettings });
  }

  public village = (villageId: number): VillageSettings => {
    let settings: VillageSettings = this.m_villageSettings[villageId];
    if (!settings) {
      settings = new VillageSettings();
      this.m_villageSettings[villageId] = settings;
    }

    return settings;
  };

  public setVillage = (villageId: number, settings: VillageSettings): void => {
    this.m_villageSettings[villageId] = settings;
  }
}
