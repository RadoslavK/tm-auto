import { HeroLevelUpSettings } from '../../_models/settings/heroLevelUpSettings.js';
import type { HeroSettings } from '../../_models/settings/heroSettings.js';
import { AutoAdventureSettings } from '../../_models/settings/tasks/autoAdventureSettings.js';
import { dataPathService } from '../dataPathService.js';
import type { ComplexSettingsServiceType } from './_types.js';
import { InternalSettingsService } from './internalSettingsService.js';

export class HeroSettingsService implements ComplexSettingsServiceType<HeroSettings> {
  public autoAdventure: InternalSettingsService<AutoAdventureSettings>;
  public heroLevelUp: InternalSettingsService<HeroLevelUpSettings>;

  constructor(accountId: string) {
    const heroSettingsPath = dataPathService.accountPath(accountId).settings
      .hero;

    this.autoAdventure = new InternalSettingsService<AutoAdventureSettings>(
      heroSettingsPath.autoAdventure,
      AutoAdventureSettings,
    );

    this.heroLevelUp = new InternalSettingsService<HeroLevelUpSettings>(
      heroSettingsPath.heroLevelUp,
      HeroLevelUpSettings,
    );
  }
}
