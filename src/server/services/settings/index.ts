import { AccountSettings } from '../../_models/settings/accountSettings';
import { AutoMentorSettings } from '../../_models/settings/autoMentorSettings';
import { HeroSettings } from '../../_models/settings/heroSettings';
import { VillageSettings } from '../../_models/settings/villageSettings';
import { dataPathService } from '../dataPathService';
import { ComplexSettingsServiceType } from './_types';
import { HeroSettingsService } from './hero';
import { InternalSettingsService } from './internalSettingsService';
import { VillageSettingsService } from './village';

export class SettingsService {
  public account: InternalSettingsService<AccountSettings>;

  public hero: ComplexSettingsServiceType<HeroSettings>;

  public autoMentor: InternalSettingsService<AutoMentorSettings>;

  private villages: Map<string, ComplexSettingsServiceType<VillageSettings>>;

  constructor(private accountId: string) {
    const accountSettingsPath = dataPathService.accountPath(accountId).settings;

    this.villages = new Map();

    this.account = new InternalSettingsService(accountSettingsPath.general, AccountSettings);
    this.hero = new HeroSettingsService(accountId);
    this.autoMentor = new InternalSettingsService(accountSettingsPath.autoMentor, AutoMentorSettings);
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