import { IHeroSettings } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import { Fields } from '../../../_shared/types';
import { AutoAdventureSettings } from './tasks/autoAdventureSettings';

const defaults: Fields<HeroSettings> = {
  autoAdventure: new AutoAdventureSettings(),
};

export class HeroSettings implements IHeroSettings {
  public autoAdventure: AutoAdventureSettings;

  constructor(params: Partial<IHeroSettings> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      autoAdventure: new AutoAdventureSettings(params.autoAdventure),
    }));
  }
}
