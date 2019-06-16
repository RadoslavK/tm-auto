import { settingsService } from '../../services/settingsService';
import { AutoAdventureSettings } from './tasks/AutoAdventureSettings';

interface IParams {
  autoAdventure: AutoAdventureSettings;
}

export class HeroSettings implements IParams {
  public autoAdventure: AutoAdventureSettings = settingsService.hero.autoAdventure.load();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
