import { ComplexSettingsServiceType } from './_types';
import { HeroSettings } from '../../_models/settings/HeroSettings';
import { InternalSettingsService } from './internalSettingsService';
import { AutoAdventureSettings } from '../../_models/settings/tasks/AutoAdventureSettings';
import { dataPathService } from '../dataPathService';
import {
  IAutoAdventureSettings,
  IHeroSettings,
} from '../../_types/graphql';

export class HeroSettingsService implements ComplexSettingsServiceType<IHeroSettings, HeroSettings> {
  public autoAdventure: InternalSettingsService<IAutoAdventureSettings, AutoAdventureSettings>;

  constructor() {
    const heroSettingsPath = dataPathService.accountPath().settings.hero;

    this.autoAdventure = new InternalSettingsService<IAutoAdventureSettings, AutoAdventureSettings>(AutoAdventureSettings, heroSettingsPath.autoAdventure);
  }

  public get = (): HeroSettings => ({
    autoAdventure: this.autoAdventure.get(),
  });
}