import { join } from 'path';
import { GeneralSettings } from '../../_models/settings/GeneralSettings';
import { HeroSettings } from '../../_models/settings/HeroSettings';
import { VillageSettings } from '../../_models/settings/VillageSettings';
import { InternalSettingsService } from './internalSettingsService';
import { ComplexSettingsServiceType } from './_types';
import { VillageSettingsService } from './village';
import { HeroSettingsService } from './hero';

export class SettingsService {
  public general: InternalSettingsService<GeneralSettings>;
  public hero: ComplexSettingsServiceType<HeroSettings>;

  private villages: Map<number, ComplexSettingsServiceType<VillageSettings>>;
  private readonly basePath: string;

  constructor(private accountId: string) {
    this.basePath = join('accounts', accountId, 'settings');

    this.villages = new Map();

    this.general = new InternalSettingsService(GeneralSettings, join(this.basePath, 'general.json'));
    this.hero = new HeroSettingsService(this.basePath);
  }

  public village = (villageId: number): ComplexSettingsServiceType<VillageSettings> => {
    let settings = this.villages.get(villageId);

    if (settings) {
      return settings;
    }

    settings = new VillageSettingsService(villageId, this.basePath);
    return settings;
  };
}