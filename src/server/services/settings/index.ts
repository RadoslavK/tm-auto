import { GeneralSettings } from '../../_models/settings/GeneralSettings';
import { HeroSettings } from '../../_models/settings/HeroSettings';
import { VillageSettings } from '../../_models/settings/VillageSettings';
import { InternalSettingsService } from './internalSettingsService';
import { ComplexSettingsServiceType } from './_types';
import { VillageSettingsService } from './village';
import { HeroSettingsService } from './hero';
import { dataPathService } from '../dataPathService';

export class SettingsService {
  public general: InternalSettingsService<GeneralSettings>;
  public hero: ComplexSettingsServiceType<HeroSettings>;

  private villages: Map<number, ComplexSettingsServiceType<VillageSettings>>;

  constructor() {
    const accountSettingsPath = dataPathService.accountPath().settings;

    this.villages = new Map();

    this.general = new InternalSettingsService(GeneralSettings, accountSettingsPath.general);
    this.hero = new HeroSettingsService();
  }

  public village = (villageId: number): ComplexSettingsServiceType<VillageSettings> => {
    let settings = this.villages.get(villageId);

    if (settings) {
      return settings;
    }

    settings = new VillageSettingsService(villageId);
    return settings;
  };
}