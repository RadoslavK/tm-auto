import { AccountSettings } from '../../_models/settings/account/accountSettings.js';
import { AutoMentorSettings } from '../../_models/settings/autoMentorSettings.js';
import type { HeroSettings } from '../../_models/settings/heroSettings.js';
import type { VillageSettings } from '../../_models/settings/villageSettings.js';
import { dataPathService } from '../dataPathService.js';
import type { ComplexSettingsServiceType } from './_types.js';
import { HeroSettingsService } from './hero.js';
import { InternalSettingsService } from './internalSettingsService.js';
import { VillageSettingsService } from './village.js';

export class SettingsService {
  public account: InternalSettingsService<AccountSettings>;

  public hero: ComplexSettingsServiceType<HeroSettings>;

  public autoMentor: InternalSettingsService<AutoMentorSettings>;

  private villages: Map<string, ComplexSettingsServiceType<VillageSettings>>;

  constructor(private accountId: string) {
    const accountSettingsPath = dataPathService.accountPath(accountId).settings;

    this.villages = new Map();

    this.account = new InternalSettingsService(
      accountSettingsPath.account,
      AccountSettings,
    );
    this.hero = new HeroSettingsService(accountId);
    this.autoMentor = new InternalSettingsService(
      accountSettingsPath.autoMentor,
      AutoMentorSettings,
    );
  }

  public village = (villageId: string): VillageSettingsService => {
    let settings = this.villages.get(villageId);

    if (settings) {
      return settings;
    }

    settings = new VillageSettingsService(this.accountId, villageId);
    this.villages.set(villageId, settings);
    return settings;
  };
}
