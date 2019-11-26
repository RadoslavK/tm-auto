import {
  AutoAdventureSettings,
} from './tasks/AutoAdventureSettings';
import { Fields } from '../../../_shared/types';
import { merge } from '../../../_shared/merge';
import { IHeroSettings } from '../../_types/graphql';

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
