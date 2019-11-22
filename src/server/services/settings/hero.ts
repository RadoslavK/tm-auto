import { join } from "path";
import { ComplexSettingsServiceType } from './_types';
import { HeroSettings } from '../../_models/settings/HeroSettings';
import { InternalSettingsService } from './internalSettingsService';
import { AutoAdventureSettings } from '../../_models/settings/tasks/AutoAdventureSettings';

export class HeroSettingsService implements ComplexSettingsServiceType<HeroSettings> {
  public autoAdventure: InternalSettingsService<AutoAdventureSettings>;

  constructor(private basePath: string) {
    const path = join(basePath, 'hero');

    this.autoAdventure = new InternalSettingsService<AutoAdventureSettings>(AutoAdventureSettings, join(path, 'autoAdventure.json'));
  }

  public get = (): HeroSettings => ({
    autoAdventure: this.autoAdventure.get(),
  });
}