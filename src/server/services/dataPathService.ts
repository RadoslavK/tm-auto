import * as path from 'path';
import { accountService } from './accountService';

class DataPathService {
  private basePath = '.data';
  public accountsPath: string;

  constructor() {
    this.accountsPath = path.join(this.basePath, 'accounts.json');
  }

  public accountPath = () => {
    const lPath = this.baseAccountPath();

    return {
      settings: this.createAccountSettingsPath(lPath),
    };
  };

  public villagePath = (villageId: number) => {
    const lPath = this.baseVillagePath(villageId);

    return {
      settings: this.createVillageSettingsPath(lPath),
      queue: path.join(lPath, 'queue.json'),
    };
  };

  private createVillageSettingsPath = (basePath: string) => {
    const lPath = path.join(basePath, 'settings');

    return {
      general: path.join(lPath, 'general.json'),
      autoBuild: path.join(lPath, 'auto-build.json'),
      autoUnits: path.join(lPath, 'auto-units.json'),
      autoParty: path.join(lPath, 'auto-party.json'),
    };
  };

  private createAccountSettingsPath = (basePath: string) => {
    const lPath = path.join(basePath, 'settings');

    return {
      general: path.join(lPath, 'general.json'),
      hero: this.createHeroSettingsPath(lPath),
    };
  };

  private createHeroSettingsPath = (basePath: string) => {
    const lPath = path.join(basePath, 'hero');

    return {
      autoAdventure: path.join(lPath, 'auto-adventure.json'),
    };
  };

  public baseVillagePath = (villageId: number): string => {
    return path.join(this.baseAccountPath(), 'villages', villageId.toString());
  };

  public baseAccountPath = (id?: string): string => {
    if (id) {
      return path.join(this.basePath, 'accounts', id);
    }

    const userAccount = accountService.getCurrentAccount();

    return path.join(this.basePath, 'accounts', userAccount.id);
  };
}

export const dataPathService = new DataPathService();