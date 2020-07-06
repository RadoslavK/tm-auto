import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { HeroLevelUpSettings } from './heroLevelUpSettings';
import { AutoAdventureSettings } from './tasks/autoAdventureSettings';

export class HeroSettings {
  public readonly autoAdventure: AutoAdventureSettings = new AutoAdventureSettings();
  public readonly heroLevelUp: HeroLevelUpSettings = new HeroLevelUpSettings();

  constructor(params: PartialFields<HeroSettings> = {}) {
    mergeDefaults(this, params);
  }
}
