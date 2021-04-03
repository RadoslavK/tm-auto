import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { HeroLevelUpSettings } from './heroLevelUpSettings.js';
import { AutoAdventureSettings } from './tasks/autoAdventureSettings.js';

export class HeroSettings {
  public readonly autoAdventure: AutoAdventureSettings = new AutoAdventureSettings();
  public readonly heroLevelUp: HeroLevelUpSettings = new HeroLevelUpSettings();

  constructor(params: PartialFields<HeroSettings> = {}) {
    mergeDefaults(this, params);
  }
}
