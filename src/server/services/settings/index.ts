import { GeneralSettings } from '../../_models/settings/generalSettings';
import { HeroSettings } from '../../_models/settings/heroSettings';
import { VillageSettings } from '../../_models/settings/villageSettings';
import { dataPathService } from '../dataPathService';
import { ComplexSettingsServiceType } from './_types';
import { HeroSettingsService } from './hero';
import { InternalSettingsService } from './internalSettingsService';
import { VillageSettingsService } from './village';

export class SettingsService {
  public general: InternalSettingsService<GeneralSettings>;
  public hero: ComplexSettingsServiceType<HeroSettings>;

  private villages: Map<number, ComplexSettingsServiceType<VillageSettings>>;

  constructor() {
    const accountSettingsPath = dataPathService.accountPath().settings;

    this.villages = new Map();

    this.general = new InternalSettingsService(accountSettingsPath.general, GeneralSettings);
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