import { ComplexSettingsServiceType } from './_types';
import { HeroSettings } from '../../_models/settings/HeroSettings';
import { InternalSettingsService } from './internalSettingsService';
import { AutoAdventureSettings } from '../../_models/settings/tasks/AutoAdventureSettings';
import { dataPathService } from '../dataPathService';

export class HeroSettingsService implements ComplexSettingsServiceType<HeroSettings> {
  public autoAdventure: InternalSettingsService<AutoAdventureSettings>;

  constructor() {
    const heroSettingsPath = dataPathService.accountPath().settings.hero;

    this.autoAdventure = new InternalSettingsService<AutoAdventureSettings>(AutoAdventureSettings, heroSettingsPath.autoAdventure);
  }

  public get = (): HeroSettings => ({
    autoAdventure: this.autoAdventure.get(),
  });
}