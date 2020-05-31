import * as path from 'path';

import { accountService } from './accountService';

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

class DataPathService {
  private basePath = '.data';
  public accountsPath: string;

  constructor() {
    this.accountsPath = path.join(this.basePath, 'accounts.json');
  }

  public accountPath = (): AccountPath => {
    const lPath = this.baseAccountPath();

    return {
      settings: this.createAccountSettingsPath(lPath),
    };
  };

  public villagePath = (villageId: number): VillagePath => {
    const lPath = this.baseVillagePath(villageId);

    return {
      queue: path.join(lPath, 'queue.json'),
      settings: this.createVillageSettingsPath(lPath),
    };
  };

  private createVillageSettingsPath = (basePath: string): VillageSettingsPath => {
    const lPath = path.join(basePath, 'settings');

    return {
      autoBuild: path.join(lPath, 'auto-build.json'),
      autoParty: path.join(lPath, 'auto-party.json'),
      autoUnits: path.join(lPath, 'auto-units.json'),
      general: path.join(lPath, 'general.json'),
    };
  };

  private createAccountSettingsPath = (basePath: string): AccountSettingsPath => {
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

  public baseVillagePath = (villageId: number): string => path.join(this.baseAccountPath(), 'villages', villageId.toString());

  public baseAccountPath = (id?: string): string => {
    if (id) {
      return path.join(this.basePath, 'accounts', id);
    }

    const userAccount = accountService.getCurrentAccount();

    return path.join(this.basePath, 'accounts', userAccount.id);
  };
}

export const dataPathService = new DataPathService();