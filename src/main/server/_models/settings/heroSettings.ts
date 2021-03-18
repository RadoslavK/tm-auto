import { mergeDefaults } from '../../../../_shared/merge.js';
import { PartialFields } from '../../../../_shared/types/fields.type.js';
import { HeroLevelUpSettings } from './heroLevelUpSettings.js';
import { AutoAdventureSettings } from './tasks/autoAdventureSettings.js';

export class HeroSettings {
  public readonly autoAdventure: AutoAdventureSettings = new AutoAdventureSettings();
  public readonly heroLevelUp: HeroLevelUpSettings = new HeroLevelUpSettings();

  constructor(params: PartialFields<HeroSettings> = {}) {
    mergeDefaults(this, params);
  }
}
