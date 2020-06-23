import fs from 'fs';

import JSZip from 'jszip';

import { getAccountContextUnsafe } from '../accountContext';
import { accountService } from './accountService';
import { DataPathService, dataPathService } from './dataPathService';
import { getGeneralSettingsService } from './settings/general';

class SettingsManagementService {
  public export = (path: string) => {
    const zip = new JSZip();

    zip.file(
      dataPathService.accountsPath(),
      JSON.stringify(accountService.getAccountsData()),
    );

    zip.file(
      DataPathService.generalPath(),
      JSON.stringify(getGeneralSettingsService().get()),
    );

    const accContext = getAccountContextUnsafe();

    if (accContext) {
      const { settingsService, villageService } = accContext;

      const accId = accountService.getCurrentAccount().id;
      const accountPath = dataPathService.accountPath(accId);

      zip.file(
        accountPath.settings.hero.autoAdventure,
        JSON.stringify(settingsService.hero.autoAdventure.get()),
      );

      zip.file(
        accountPath.settings.autoMentor,
        JSON.stringify(settingsService.autoMentor.get()),
      );

      zip.file(
        accountPath.settings.account,
        JSON.stringify(settingsService.account.get()),
      );

      villageService.allVillages().forEach((village) => {
        const {
          settings: villageSettingsPath,
          queue: villageQueuePath,
        } = dataPathService.villagePath(accId, village.id);

        const villageSettingsService = settingsService.village(village.id);

        zip.file(
          villageQueuePath,
          JSON.stringify(village.buildings.queue.buildings()),
        );

        zip.file(
          villageSettingsPath.autoBuild,
          JSON.stringify(villageSettingsService.autoBuild.get()),
        );

        zip.file(
          villageSettingsPath.autoUnits,
          JSON.stringify(villageSettingsService.autoUnits.get()),
        );

        zip.file(
          villageSettingsPath.autoParty,
          JSON.stringify(villageSettingsService.autoParty.get()),
        );

        zip.file(
          villageSettingsPath.general,
          JSON.stringify(villageSettingsService.general.get()),
        );
      });
    }

    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(path));
  };

  public import = (path: string) => {
    console.log(path);
  };
}

export const settingsManagementService = new SettingsManagementService();
