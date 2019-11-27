import { HeroSettings } from '../../_models/settings/heroSettings';
import { AutoAdventureSettings } from '../../_models/settings/tasks/autoAdventureSettings';
import {
  IAutoAdventureSettings,
  IHeroSettings,
} from '../../_types/graphql';
import { dataPathService } from '../dataPathService';
import { ComplexSettingsServiceType } from './_types';
import { InternalSettingsService } from './internalSettingsService';

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