import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { AutoAdventureSettings } from './tasks/autoAdventureSettings';

export class HeroSettings {
  public readonly autoAdventure: AutoAdventureSettings = new AutoAdventureSettings();

  constructor(params: PartialFields<HeroSettings> = {}) {
    mergeDefaults(this, params);
  }
}
