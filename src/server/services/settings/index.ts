import { GeneralSettings } from '../../_models/settings/GeneralSettings';
import { HeroSettings } from '../../_models/settings/HeroSettings';
import { VillageSettings } from '../../_models/settings/VillageSettings';
import { InternalSettingsService } from './internalSettingsService';
import { ComplexSettingsServiceType } from './_types';
import { VillageSettingsService } from './village';
import { HeroSettingsService } from './hero';
import { dataPathService } from '../dataPathService';
import {
  IGeneralSettings,
  IHeroSettings,
  IVillageSettings,
} from '../../_types/graphql';

export class SettingsService {
  public general: InternalSettingsService<IGeneralSettings, GeneralSettings>;
  public hero: ComplexSettingsServiceType<IHeroSettings, HeroSettings>;

  private villages: Map<number, ComplexSettingsServiceType<IVillageSettings, VillageSettings>>;

  constructor() {
    const accountSettingsPath = dataPathService.accountPath().settings;

    this.villages = new Map();

    this.general = new InternalSettingsService(GeneralSettings, accountSettingsPath.general);
    this.hero = new HeroSettingsService();
  }

  public village = (villageId: number): ComplexSettingsServiceType<IVillageSettings, VillageSettings> => {
    let settings = this.villages.get(villageId);

    if (settings) {
      return settings;
    }

    settings = new VillageSettingsService(villageId);
    return settings;
  };
}