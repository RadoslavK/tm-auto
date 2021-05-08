import fs from 'fs';
import path from 'path';
import { TimeoutError } from 'puppeteer-core/lib/cjs/puppeteer/common/Errors';
import { formatTime } from 'shared/utils/formatTime.js';

import { TravianPath } from '../_enums/travianPath.js';
import type { CoolDown } from '../_models/coolDown.js';
import { Duration } from '../_models/duration.js';
import { AccountContext } from '../accountContext.js';
import { browserManager } from '../browser/browserManager.js';
import { updateBuildings } from '../controller/actions/buildings/updateBuildings.js';
import { ensureContextualHelpIsOff } from '../controller/actions/ensureContextualHelpIsOff.js';
import { ensureCookiesAreSubmitted } from '../controller/actions/ensureCookiesAreSubmitted.js';
import { ensureLoggedIn } from '../controller/actions/ensureLoggedIn.js';
import { ensureVillageSelected } from '../controller/actions/ensureVillageSelected.js';
import {
  initGameInfo,
  loadGameInfo,
} from '../controller/actions/player/initGameInfo.js';
import { updateCapitalAndAlly } from '../controller/actions/player/updateCapitalAndAlly.js';
import { updateToken } from '../controller/actions/player/updateToken.js';
import { refreshVillage } from '../controller/actions/village/refreshVillage.js';
import { updateNewOldVillages } from '../controller/actions/village/updateNewOldVillages.js';
import { updateResources } from '../controller/actions/village/updateResources.js';
import { TaskManager } from '../controller/taskManager.js';
import { BotEvent } from '../events/botEvent.js';
import { updateHeroInformation } from '../parsers/hero/updateHeroInformation.js';
import { publishPayloadEvent } from '../pubSub.js';
import { getServerAppDirectory } from '../utils/getServerAppDirectory.js';
import { shuffle } from '../utils/shuffle.js';
import { accountService } from './accountService.js';
import { activityService } from './botActivityService.js';
import { GeneralSettingsService } from './settings/general.js';

type HandleErrorResult = {
  readonly allowContinue: boolean;
  readonly coolDown?: CoolDown;
};

export enum BotState {
  None = 'None',
  InitialScanning = 'InitialScanning',
  Running = 'Running',
  Stopping = 'Stopping',
  Paused = 'Paused'
}

export class ControllerService {
  private _timeout: NodeJS.Timeout | null = null;
  private _taskManager: TaskManager | null = null;
  private _refreshRequests: Set<string> = new Set<string>();
  private _botState: BotState = BotState.None;

  public state = (): BotState => this._botState;

  private setState = (state: BotState): void => {
    this._botState = state;

    publishPayloadEvent(BotEvent.BotRunningChanged, { state });
  };

  private handleError = async (error: Error): Promise<HandleErrorResult> => {
    console.error(error.stack);
    AccountContext.getContext().logsService.logError(error.message);

    // Maybe its maintenance
    try {
      let hasMaintenance: boolean;
      let maintenanceCount = 0;

      do {
        const page = await browserManager.getPage();
        const content = await page.content();

        hasMaintenance = content.toLowerCase().includes('maintenance');

        if (!hasMaintenance) {
          if (maintenanceCount > 0) {
            return { allowContinue: true };
          } else {
            break;
          }
        }

        maintenanceCount++;

        const nextCoolDownSeconds =
          maintenanceCount < 7
            ? Math.pow(2, maintenanceCount) * 30
            : (Math.random() * (40 - 30) + 30) * 60;

        activityService.setActivity(
          `There is a maintenance on the server, waiting ${formatTime(
            Duration.fromSeconds(nextCoolDownSeconds),
          )} minutes...`,
        );

        // Reset the page so it can be reloaded again after timeout
        await page.goto('about:blank');

        await page.waitForTimeout(nextCoolDownSeconds * 1000);

        const account = accountService.getCurrentAccount();

        await page.goto(
          `${account.server}/${TravianPath.ResourceFieldsOverview}`,
        );
      } while (true);
    } catch (tryMaintenanceError) {
      console.error(tryMaintenanceError.stack);
      AccountContext.getContext().logsService.logError(
        'Tried to wait for maintenance but failed with message...',
      );
      AccountContext.getContext().logsService.logError(tryMaintenanceError.message);
    }

    //  Maybe its some forced dialog about server progress
    try {
      const page = await browserManager.getPage();

      const continueButton = await page.$(
        `[href="${TravianPath.ResourceFieldsOverview}?ok=1"]`,
      );

      if (continueButton) {
        activityService.setActivity(
          'Found a dialog about server progress, continuing...',
        );

        await Promise.all([
          page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
          continueButton.click(),
        ]);

        return { allowContinue: true };
      }
    } catch (tryContinueError) {
      console.error(tryContinueError.stack);
      AccountContext.getContext().logsService.logError(
        'Tried to continue the server progress dialog but failed with message...',
      );
      AccountContext.getContext().logsService.logError(tryContinueError.message);
    }

    const now = new Date();
    const format = `${now.getDate()}-${
      now.getMonth() + 1
    }-${now.getFullYear()} ${now.getHours()},${now.getMinutes()},${now.getSeconds()}`;
    const dir = getServerAppDirectory();
    const directory = path.join(dir, '.screenshots');

    // try to make screenshot
    try {
      const page = await browserManager.getPage();

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }

      await fs.promises.writeFile(
        path.join(directory, `${format}.txt`),
        error.stack ?? '',
        {
          flag: 'w',
        },
      );
      await fs.promises.writeFile(
        path.join(directory, `${format}.html`),
        await page.content(),
        {
          flag: 'w',
        },
      );

      await page.screenshot({
        fullPage: true,
        path: path.join(directory, `${format}.png`),
      });
    } catch (screenshotError) {
      console.error(screenshotError.stack);
      AccountContext.getContext().logsService.logError(screenshotError.message);

      await fs.promises.writeFile(
        path.join(directory, `${format}-screenshot-error.txt`),
        screenshotError.stack ?? '',
        {
          flag: 'w',
        },
      );
    }

    await browserManager.kill();

    const allowContinue = error instanceof TimeoutError
      //  TODO check instanceof
      || error.message.includes('Execution context was destroyed');

    return { allowContinue };
  };

  public signIn = async (accountId: string): Promise<void> => {
    activityService.setActivity('Loading account context');
    AccountContext.setContext(accountId);
    accountService.setCurrentAccountId(accountId);

    let allowContinue = true;

    try {
      if (this._botState !== BotState.None) {
        return;
      }

      activityService.setActivity('Preparing');
      this.setState(BotState.InitialScanning);

      await loadGameInfo();
      activityService.setActivity('Loading villages');
      await AccountContext.getContext().villageService.load();
      await ensureCookiesAreSubmitted();
      await ensureLoggedIn();
      await ensureContextualHelpIsOff();
      await initGameInfo();
      await updateToken();
      const capitalVillageCoords = await updateCapitalAndAlly(false);
      await updateHeroInformation();
      await updateNewOldVillages();

      const allVillages = AccountContext.getContext().villageService.allVillages();
      const scanned = shuffle(allVillages.filter(v => v.scanned));
      const notScanned = shuffle(allVillages.filter(v => !v.scanned));

      //  Scan not previously scanned first
      for (const village of notScanned.concat(scanned)) {
        await ensureVillageSelected(village.id);
        await updateResources();
        await updateBuildings();

        village.isCapital = village.coords.equalsTo(capitalVillageCoords);

        if (!village.scanned) {
          village.scanned = true;
          await AccountContext.getContext().villageService.serialize([village.id]);
        }

        publishPayloadEvent(BotEvent.VillageUpdated, { village });
      }
    } catch (error) {
      await this.handleError(error);
      allowContinue = false;
    }

    if (!allowContinue) {
      await this.signOut();

      return;
    }

    const generalSettings = GeneralSettingsService.getService().get();

    if (generalSettings.autoStart) {
      await this.start();
    } else {
      this.setState(BotState.Paused);
      await this.markActivityStop();
    }
  };

  public signOut = async (): Promise<void> => {
    this.setState(BotState.None);
    AccountContext.resetContext();
    accountService.setCurrentAccountId(null);
    await this.markActivityStop();
  };

  public start = async (): Promise<void> => {
    this.setState(BotState.Running);
    await this.execute();
  };

  private execute = async (): Promise<void> => {
    for (const villageId of this._refreshRequests) {
      await refreshVillage(villageId);
    }

    this._refreshRequests.clear();

    if (AccountContext.getContext().nextExecutionService.tasks() > new Date()) {
      this._timeout = global.setTimeout(async () => {
        await this.execute();
      }, 1000);

      return;
    }

    let allowContinue = true;
    let coolDown: CoolDown | undefined;

    try {
      await ensureLoggedIn();

      if (!this._taskManager) {
        this._taskManager = new TaskManager();
      }

      await this._taskManager.execute();
    } catch (error) {
      const result = await this.handleError(error);
      ({ allowContinue, coolDown } = result);
    }

    if (!allowContinue) {
      await this.markActivityStop();
      this.setState(BotState.Paused);

      return;
    }

    const tasksCoolDown =
      coolDown ||
      AccountContext.getContext().settingsService.account.get().tasksCoolDown;
    const nextTimeout = tasksCoolDown.getRandomDelay();

    const nextExecution = new Date();
    nextExecution.setSeconds(nextExecution.getSeconds() + nextTimeout);
    AccountContext.getContext().nextExecutionService.setTasks(nextExecution);
    await this.markActivityStop();

    this._timeout = global.setTimeout(async () => {
      await this.execute();
    }, 1000);
  };

  public stop = async (): Promise<void> => {
    this.setState(BotState.Stopping);

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._taskManager = null;

    await this.markActivityStop();
    this.setState(BotState.Paused);
  };

  public requestVillageRefresh = async (villageId: string) => {
    if (this._botState === BotState.Running) {
      this._refreshRequests.add(villageId);
      return;
    }

    await refreshVillage(villageId);
    await this.markActivityStop();
  };

  private markActivityStop = async (): Promise<void> => {
    activityService.setActivity('');
    await browserManager.killPage();
  };
}
