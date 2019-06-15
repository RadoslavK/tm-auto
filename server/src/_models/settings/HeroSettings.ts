import { AutoAdventureSettings } from './tasks/AutoAdventureSettings';

interface IParams {
  autoAdventure: AutoAdventureSettings;
}

export class HeroSettings implements IParams {
  public autoAdventure: AutoAdventureSettings = new AutoAdventureSettings();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
