import {
  AutoAdventureSettings,
  IAutoAdventureSettingsParams,
} from './tasks/AutoAdventureSettings';
import { Fields } from '../../../_shared/types';
import { merge } from '../../../_shared/merge';

export interface IHeroSettingsParams {
  readonly autoAdventure: IAutoAdventureSettingsParams;
}

const defaults: Fields<HeroSettings> = {
  autoAdventure: new AutoAdventureSettings(),
};

export class HeroSettings implements IHeroSettingsParams {
  public autoAdventure: AutoAdventureSettings;

  constructor(params: Partial<IHeroSettingsParams> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      autoAdventure: new AutoAdventureSettings(params.autoAdventure),
    }));
  }
}
