import { HeroSettings } from '../../_models/settings/heroSettings';
import { AutoAdventureSettings } from '../../_models/settings/tasks/autoAdventureSettings';
import { dataPathService } from '../dataPathService';
import { ComplexSettingsServiceType } from './_types';
import { InternalSettingsService } from './internalSettingsService';

export class HeroSettingsService
  implements ComplexSettingsServiceType<HeroSettings> {
  public autoAdventure: InternalSettingsService<AutoAdventureSettings>;

  constructor(accountId: string) {
    const heroSettingsPath = dataPathService.accountPath(accountId).settings
      .hero;

    this.autoAdventure = new InternalSettingsService<AutoAdventureSettings>(
      heroSettingsPath.autoAdventure,
      AutoAdventureSettings,
    );
  }
}
