import fs from 'fs';

import JSZip from 'jszip';

import { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding';
import { AccountSettings } from '../_models/settings/accountSettings';
import { AutoMentorSettings } from '../_models/settings/autoMentorSettings';
import { GeneralSettings } from '../_models/settings/generalSettings';
import { GeneralVillageSettings } from '../_models/settings/generalVillageSettings';
import { AutoAdventureSettings } from '../_models/settings/tasks/autoAdventureSettings';
import { AutoBuildSettings } from '../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../_models/settings/tasks/autoPartySettings';
import { AutoUnitsSettings } from '../_models/settings/tasks/autoUnitsSettings';
import { getAccountContextUnsafe } from '../accountContext';
import { BotEvent } from '../events/botEvent';
import { publishPayloadEvent } from '../pubSub';
import { AccountsData, accountService } from './accountService';
import { BuildingQueueService } from './buildingQueueService';
import { DataPathService, dataPathService } from './dataPathService';
import { getGeneralSettingsService } from './settings/general';

const updateSettings = async <TData = object>(
  zip: JSZip,
  path: string,
  update: (data: TData) => void,
) => {
  const textData = await zip.file(path)?.async('text');

  if (!textData) {
    return;
  }

  update(JSON.parse(textData));
};

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

  public import = async (path: string) => {
    const data = await fs.promises.readFile(path);
    const zip = await JSZip.loadAsync(data);

    await updateSettings(zip, dataPathService.accountsPath(), (accounts) => {
      const newAccounts = new AccountsData(accounts);

      publishPayloadEvent(BotEvent.AccountsUpdated, {
        accounts: newAccounts.accounts,
      });
      publishPayloadEvent(BotEvent.LastSignedAccountIdUpdated, {
        lastSignedAccountId: newAccounts.lastSignedAccountId,
      });
      accountService.updateAccountsData(newAccounts);
    });

    await updateSettings(
      zip,
      DataPathService.generalPath(),
      (generalSettings) => {
        const newSettings = new GeneralSettings(generalSettings);

        getGeneralSettingsService().update(newSettings);
        publishPayloadEvent(BotEvent.GeneralSettingsUpdated, {
          settings: newSettings,
        });
      },
    );

    const accContext = getAccountContextUnsafe();

    if (accContext) {
      const { settingsService, villageService } = accContext;

      const accId = accountService.getCurrentAccount().id;
      const accountPath = dataPathService.accountPath(accId);

      await updateSettings(
        zip,
        accountPath.settings.hero.autoAdventure,
        (autoAdventureSettings) => {
          const newSettings = new AutoAdventureSettings(autoAdventureSettings);

          settingsService.hero.autoAdventure.update(newSettings);
          publishPayloadEvent(BotEvent.AutoAdventureSettingsUpdated, {
            settings: newSettings,
          });
        },
      );

      await updateSettings(
        zip,
        accountPath.settings.autoMentor,
        (autoMentorSettings) => {
          const newSettings = new AutoMentorSettings(autoMentorSettings);

          settingsService.autoMentor.update(newSettings);
          publishPayloadEvent(BotEvent.AutoMentorSettingsUpdated, {
            settings: newSettings,
          });
        },
      );

      await updateSettings(
        zip,
        accountPath.settings.account,
        (accountSettings) => {
          const newSettings = new AccountSettings(accountSettings);

          settingsService.account.update(newSettings);
          publishPayloadEvent(BotEvent.AccountSettingsUpdated, {
            settings: newSettings,
          });
        },
      );

      for (const village of villageService.allVillages()) {
        const {
          settings: villageSettingsPath,
          queue: villageQueuePath,
        } = dataPathService.villagePath(accId, village.id);

        const villageSettingsService = settingsService.village(village.id);

        await updateSettings<QueuedBuilding[]>(
          zip,
          villageQueuePath,
          (buildings) => {
            new BuildingQueueService(village.id).setQueue(buildings);
          },
        );

        await updateSettings(
          zip,
          villageSettingsPath.autoBuild,
          (autoBuildSettings) => {
            const newSettings = new AutoBuildSettings(autoBuildSettings);

            villageSettingsService.autoBuild.update(newSettings);
            publishPayloadEvent(BotEvent.AutoBuildSettingsUpdated, {
              settings: newSettings,
              villageId: village.id,
            });
          },
        );

        await updateSettings(
          zip,
          villageSettingsPath.autoUnits,
          (autoUnitsSettings) => {
            const newSettings = new AutoUnitsSettings(autoUnitsSettings);

            villageSettingsService.autoUnits.update(newSettings);
            publishPayloadEvent(BotEvent.AutoUnitsSettingsUpdated, {
              settings: newSettings,
              villageId: village.id,
            });
          },
        );

        await updateSettings(
          zip,
          villageSettingsPath.autoParty,
          (autoPartySettings) => {
            const newSettings = new AutoPartySettings(autoPartySettings);

            villageSettingsService.autoParty.update(newSettings);
            publishPayloadEvent(BotEvent.AutoPartySettingsUpdated, {
              settings: newSettings,
              villageId: village.id,
            });
          },
        );

        await updateSettings(zip, villageSettingsPath.general, (settings) => {
          const newSettings = new GeneralVillageSettings(settings);

          villageSettingsService.general.update(newSettings);
          publishPayloadEvent(BotEvent.GeneralVillageSettingsUpdated, {
            settings: newSettings,
            villageId: village.id,
          });
        });
      }
    }
  };
}

export const settingsManagementService = new SettingsManagementService();
