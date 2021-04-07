import fs from 'fs';
import JSZip from 'jszip';
import path from 'path';

import type { QueuedBuilding } from '../_models/buildings/queue/queuedBuilding.js';
import { AccountSettings } from '../_models/settings/account/accountSettings.js';
import { AutoMentorSettings } from '../_models/settings/autoMentorSettings.js';
import { GeneralSettings } from '../_models/settings/generalSettings.js';
import { GeneralVillageSettings } from '../_models/settings/generalVillageSettings.js';
import { AutoAdventureSettings } from '../_models/settings/tasks/autoAdventureSettings.js';
import { AutoBuildSettings } from '../_models/settings/tasks/autoBuildSettings';
import { AutoPartySettings } from '../_models/settings/tasks/autoPartySettings.js';
import { AutoUnitsSettings } from '../_models/settings/tasks/autoUnitsSettings.js';
import { AccountContext } from '../accountContext.js';
import { BotEvent } from '../events/botEvent.js';
import { publishPayloadEvent } from '../pubSub.js';
import { getServerAppDirectory } from '../utils/getServerAppDirectory.js';
import {
  AccountsData,
  accountService, 
} from './accountService.js';
import { BuildingQueueService } from './buildingQueueService.js';
import {
  DataPathService,
  dataPathService, 
} from './dataPathService.js';
import { fileService } from './fileService.js';
import { SettingsService } from './settings';
import { GeneralSettingsService } from './settings/general.js';

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

export class SettingsManagementService {
  private saveZip = (zipPath: string, populateZip: (zip: JSZip) => void) => {
    const zip = new JSZip();

    populateZip(zip);

    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(zipPath));
  };

  private readZip = async (
    zipPath: string,
    processZip: (zip: JSZip) => Promise<void> | void,
  ) => {
    const data = await fs.promises.readFile(zipPath);
    const zip = await JSZip.loadAsync(data);

    await processZip(zip);
  };

  public exportAccountSettings = (accountId: string, zipPath: string) =>
    this.saveZip(zipPath, (zip) => {
      const accContext =
        accountService.currentAccountId === accountId
          ? AccountContext.getContextUnsafe()
          : null;

      let settingsService: SettingsService;
      let villageIds: readonly string[];

      if (accContext) {
        ({ settingsService } = accContext);
        villageIds = accContext.villageService.allVillages().map((v) => v.id);
      } else {
        settingsService = new SettingsService(accountId);
        const villagesPath = dataPathService.villagesPath(accountId);

        villageIds = fs
          .readdirSync(path.join(getServerAppDirectory(), villagesPath), {
            withFileTypes: true,
          })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);
      }

      const accountPath = dataPathService.accountPath(accountId);

      const autoHeroSettings = settingsService.hero.autoAdventure.getWithoutDefaultValue();

      if (autoHeroSettings) {
        zip.file(
          accountPath.settings.hero.autoAdventure,
          JSON.stringify(autoHeroSettings),
        );
      }

      const autoMentorSettings = settingsService.autoMentor.getWithoutDefaultValue();

      if (autoMentorSettings) {
        zip.file(
          accountPath.settings.autoMentor,
          JSON.stringify(autoMentorSettings),
        );
      }

      const generalAccountSettings = settingsService.account.getWithoutDefaultValue();

      if (generalAccountSettings) {
        zip.file(
          accountPath.settings.account,
          JSON.stringify(generalAccountSettings),
        );
      }

      villageIds.forEach((villageId) => {
        const {
          settings: villageSettingsPath,
          queue: villageQueuePath,
        } = dataPathService.villagePath(accountId, villageId);

        const villageSettingsService = settingsService.village(villageId);

        const buildings = accContext
          ? accContext.villageService
            .village(villageId)
            .buildings.queue.buildings()
          : fileService.load<QueuedBuilding[]>(
            dataPathService.villagePath(accountId, villageId).queue,
            [],
          );

        zip.file(villageQueuePath, JSON.stringify(buildings));

        const autoBuildSettings = villageSettingsService.autoBuild.getWithoutDefaultValue();

        if (autoBuildSettings) {
          zip.file(
            villageSettingsPath.autoBuild,
            JSON.stringify(autoBuildSettings),
          );
        }

        const autoUnitsSettings = villageSettingsService.autoUnits.getWithoutDefaultValue();

        if (autoUnitsSettings) {
          zip.file(
            villageSettingsPath.autoUnits,
            JSON.stringify(autoUnitsSettings),
          );
        }

        const autoPartySettings = villageSettingsService.autoParty.getWithoutDefaultValue();

        if (autoPartySettings) {
          zip.file(
            villageSettingsPath.autoParty,
            JSON.stringify(autoPartySettings),
          );
        }

        const generalVillageSettings = villageSettingsService.general.getWithoutDefaultValue();

        if (generalVillageSettings) {
          zip.file(
            villageSettingsPath.general,
            JSON.stringify(generalVillageSettings),
          );
        }
      });
    });

  public exportGeneralSettings = (zipPath: string) =>
    this.saveZip(zipPath, (zip) => {
      zip.file(
        DataPathService.generalPath(),
        JSON.stringify(GeneralSettingsService.getService().get()),
      );
    });

  public exportAccounts = (zipPath: string) =>
    this.saveZip(zipPath, (zip) => {
      zip.file(
        dataPathService.accountsPath(),
        JSON.stringify(accountService.getAccountsData()),
      );
    });

  public importAccountSettings = (accountId: string, zipPath: string) =>
    this.readZip(zipPath, async (zip) => {
      const accContext =
        accountService.currentAccountId === accountId
          ? AccountContext.getContextUnsafe()
          : null;

      const settingsService = accContext
        ? accContext.settingsService
        : new SettingsService(accountId);

      let villageIds: readonly string[];

      if (accContext) {
        villageIds = accContext.villageService.allVillages().map((v) => v.id);
      } else {
        const villagesPath = dataPathService.villagesPath(accountId);

        const villagesFolder = zip.folder(villagesPath);

        villageIds = villagesFolder
          ? // Cannot read folders from zip so need to extract from absolute path
          Object.values(villagesFolder.files).reduce((ids, x) => {
            const suffix = x.name.slice(villagesPath.length);
            const match = new RegExp(/\\(\d+)/).exec(suffix);
            const id = match && match[1];

            return id && !ids.includes(id) ? [...ids, id] : ids;
          }, [] as string[])
          : [];
      }

      const accountPath = dataPathService.accountPath(accountId);

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

      for (const villageId of villageIds) {
        const {
          settings: villageSettingsPath,
          queue: villageQueuePath,
        } = dataPathService.villagePath(accountId, villageId);

        const villageSettingsService = settingsService.village(villageId);

        await updateSettings<QueuedBuilding[]>(
          zip,
          villageQueuePath,
          (buildings) => {
            if (accContext) {
              new BuildingQueueService(villageId).setQueue(buildings);
            } else {
              fileService.save(
                dataPathService.villagePath(accountId, villageId).queue,
                buildings,
              );
            }
          },
        );

        await updateSettings(
          zip,
          villageSettingsPath.autoBuild,
          (autoBuildSettings) => {
            const newSettings = new AutoBuildSettings(autoBuildSettings);

            villageSettingsService.autoBuild.update(newSettings);
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
              villageId,
            });
          },
        );

        await updateSettings(
          zip,
          villageSettingsPath.autoParty,
          (autoPartySettings) => {
            const newSettings = new AutoPartySettings(autoPartySettings);

            villageSettingsService.autoParty.update(newSettings);
          },
        );

        await updateSettings(zip, villageSettingsPath.general, (settings) => {
          const newSettings = new GeneralVillageSettings(settings);

          villageSettingsService.general.update(newSettings);
        });
      }
    });

  public importGeneralSettings = (zipPath: string) =>
    this.readZip(zipPath, async (zip) => {
      await updateSettings(
        zip,
        DataPathService.generalPath(),
        (generalSettings) => {
          const newSettings = new GeneralSettings(generalSettings);

          GeneralSettingsService.getService().update(newSettings);
        },
      );
    });

  public importAccounts = (zipPath: string) =>
    this.readZip(zipPath, async (zip) => {
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
    });
}
