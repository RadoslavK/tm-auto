import path from 'path';

import { accountService } from './accountService';

type HeroSettingsPath = {
  readonly autoAdventure: string;
};

type AccountSettingsPath = {
  readonly autoMentor: string;
  readonly account: string;
  readonly hero: HeroSettingsPath;
};

type AccountPath = {
  readonly root: string;
  readonly settings: AccountSettingsPath;
};

type VillageSettingsPath = {
  readonly autoBuild: string;
  readonly autoParty: string;
  readonly autoUnits: string;
  readonly general: string;
};

type VillagePath = {
  readonly root: string;
  readonly queue: string;
  readonly settings: VillageSettingsPath;
};

type ServerPath = {
  readonly root: string;
  readonly scannedSectors: string;
  readonly scannedOasisTiles: string;
  readonly scannedVillageTiles: string;
};

export class DataPathService {
  static generalPath = () => 'generalSettings.json';

  public accountsPath = () => 'accounts.json';

  public serverPath = (accountId: string): ServerPath => {
    const { server } = accountService.getAccountOrThrow(accountId);
    const serverName = Buffer.from(server).toString('base64');
    const root = path.join('server', serverName);

    return {
      root,
      scannedSectors: path.join(root, 'scannedSectors.json'),
      scannedVillageTiles: path.join(root, 'scannedVillageTiles.json'),
      scannedOasisTiles: path.join(root, 'scannedOasisTiles.json'),
    };
  };

  public accountPath = (accountId: string): AccountPath => {
    const lPath = this.baseAccountPath(accountId);

    return {
      root: lPath,
      settings: this.createAccountSettingsPath(lPath),
    };
  };

  public villagePath = (accountId: string, villageId: string): VillagePath => {
    const lPath = this.baseVillagePath(accountId, villageId);

    return {
      root: lPath,
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
      account: path.join(lPath, 'general.json'),
      hero: this.createHeroSettingsPath(lPath),
    };
  };

  private createHeroSettingsPath = (basePath: string): HeroSettingsPath => {
    const lPath = path.join(basePath, 'hero');

    return {
      autoAdventure: path.join(lPath, 'auto-adventure.json'),
    };
  };

  public villagesPath = (accountId: string): string =>
    path.join(this.baseAccountPath(accountId), 'village');

  private baseVillagePath = (accountId: string, villageId: string): string =>
    path.join(this.villagesPath(accountId), villageId);

  private baseAccountPath = (id: string): string => path.join('account', id);
}

export const dataPathService = new DataPathService();
