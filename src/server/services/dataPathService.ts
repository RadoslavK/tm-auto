import path from 'path';

import { getServerAppDirectory } from '../utils/getServerAppDirectory';
import { getGeneralSettingsService } from './settings/general';

type HeroSettingsPath = {
  readonly autoAdventure: string;
};

type AccountSettingsPath = {
  readonly autoMentor: string;
  readonly general: string;
  readonly hero: HeroSettingsPath;
};

type AccountPath = {
  readonly settings: AccountSettingsPath;
};

type VillageSettingsPath = {
  readonly autoBuild: string;
  readonly autoParty: string;
  readonly autoUnits: string;
  readonly general: string;
};

type VillagePath = {
  readonly queue: string;
  readonly settings: VillageSettingsPath;
};

export class DataPathService {
  static generalPath = () =>
    path.join(getServerAppDirectory(), '.data/settings/general.json');

  private basePath = () => getGeneralSettingsService().get().dataPath;

  public accountsPath = () => path.join(this.basePath(), 'accounts.json');

  public accountPath = (accountId: string): AccountPath => {
    const lPath = this.baseAccountPath(accountId);

    return {
      settings: this.createAccountSettingsPath(lPath),
    };
  };

  public villagePath = (accountId: string, villageId: string): VillagePath => {
    const lPath = this.baseVillagePath(accountId, villageId);

    return {
      queue: path.join(lPath, 'queue.json'),
      settings: this.createVillageSettingsPath(lPath),
    };
  };

  private createVillageSettingsPath = (
    basePath: string,
  ): VillageSettingsPath => {
    const lPath = path.join(basePath, 'settings');

    return {
      autoBuild: path.join(lPath, 'auto-build.json'),
      autoParty: path.join(lPath, 'auto-party.json'),
      autoUnits: path.join(lPath, 'auto-units.json'),
      general: path.join(lPath, 'general.json'),
    };
  };

  private createAccountSettingsPath = (
    basePath: string,
  ): AccountSettingsPath => {
    const lPath = path.join(basePath, 'settings');

    return {
      autoMentor: path.join(lPath, 'autoMentor.json'),
      general: path.join(lPath, 'general.json'),
      hero: this.createHeroSettingsPath(lPath),
    };
  };

  private createHeroSettingsPath = (basePath: string): HeroSettingsPath => {
    const lPath = path.join(basePath, 'hero');

    return {
      autoAdventure: path.join(lPath, 'auto-adventure.json'),
    };
  };

  public baseVillagePath = (accountId: string, villageId: string): string =>
    path.join(this.baseAccountPath(accountId), 'villages', villageId);

  public baseAccountPath = (id: string): string =>
    path.join(this.basePath(), 'accounts', id);
}

export const dataPathService = new DataPathService();
