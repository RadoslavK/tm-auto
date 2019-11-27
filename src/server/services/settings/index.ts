import { GeneralSettings } from '../../_models/settings/generalSettings';
import { HeroSettings } from '../../_models/settings/heroSettings';
import { VillageSettings } from '../../_models/settings/villageSettings';
import {
  IGeneralSettings,
  IHeroSettings,
  IVillageSettings,
} from '../../_types/graphql';
import { dataPathService } from '../dataPathService';
import { ComplexSettingsServiceType } from './_types';
import { HeroSettingsService } from './hero';
import { InternalSettingsService } from './internalSettingsService';
import { VillageSettingsService } from './village';

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