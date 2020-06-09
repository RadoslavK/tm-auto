import fs from 'fs';
import path from 'path';
import { TimeoutError } from 'puppeteer/Errors';

import { TravianPath } from '../_enums/travianPath';
import { CoolDown } from '../_models/coolDown';
import { Duration } from '../_models/duration';
import { BotState } from '../../_shared/types/botState';
import {
  getAccountContext,
  resetAccountContext,
  setAccountContext,
} from '../accountContext';
import {
  getPage,
  killBrowser,
} from '../browser/getPage';
import { updateBuildings } from '../controller/actions/buildings/updateBuildings';
import { ensureContextualHelpIsOff } from '../controller/actions/ensureContextualHelpIsOff';
import { ensureLoggedIn } from '../controller/actions/ensureLoggedIn';
import { ensureVillageSelected } from '../controller/actions/ensureVillageSelected';
import { initPlayerInfo } from '../controller/actions/player/initPlayerInfo';
import { updatePlayerInfo } from '../controller/actions/player/updatePlayerInfo';
import { refreshVillage } from '../controller/actions/village/refreshVillage';
import { updateNewOldVillages } from '../controller/actions/village/updateNewOldVillages';
import { updateResources } from '../controller/actions/village/updateResources';
import { TaskManager } from '../controller/taskManager';
import { BotEvent } from '../events/botEvent';
import { updateHeroInformation } from '../parsers/hero/updateHeroInformation';
import {
  publishEvent,
  publishPayloadEvent,
} from '../pubSub';
import { shuffle } from '../utils/shuffle';
import { accountService } from './accountService';
import { getGeneralSettingsService } from './settings/general';

type HandleErrorResult = {
  readonly allowContinue: boolean;
  readonly coolDown?: CoolDown;
};

const handleError = async (error: Error): Promise<HandleErrorResult> => {
  console.error(error.stack);
  getAccountContext().logsService.logError(error.message);

  // Maybe its maintenance
  try {
    const page = await getPage();
    const content = await page.content();

    const hasMaintenance = content.toLowerCase().includes('maintenance');

    if (hasMaintenance) {
      getAccountContext().logsService.logText('There is a maintenance on the server, waiting 30-40 minutes...');

      // Reset the page so it can be reloaded again after timeout
      await page.goto('about:blank');

      return {
        allowContinue: true,
        coolDown: new CoolDown({
          min: new Duration({ minutes: 30 }),
          max: new Duration({ minutes: 40 }),
        }),
      };
    }
  } catch (tryMaintenanceError) {
    console.error(tryMaintenanceError.stack);
    getAccountContext().logsService.logError('Tried to wait for maintenance but failed with message...');
    getAccountContext().logsService.logError(tryMaintenanceError.message);
  }

  //  Maybe its some forced dialog about server progress
  try {
    const page = await getPage();

    const continueButton = await page.$(`[href="${TravianPath.ResourceFieldsOverview}?ok"]`);

    if (continueButton) {
      getAccountContext().logsService.logText('Found a dialog about server progress, continuing...');

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        continueButton.click(),
      ]);
    }

    return { allowContinue: true };
  } catch (tryContinueError) {
    console.error(tryContinueError.stack);
    getAccountContext().logsService.logError('Tried to continue the server progress dialog but failed with message...');
    getAccountContext().logsService.logError(tryContinueError.message);
  }

  const now = new Date();
  const format = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()},${now.getMinutes()},${now.getSeconds()}`;
  const dir = getGeneralSettingsService().get().dataPath;
  const directory = path.join(dir, '.screenshots');

  // try to make screenshot
  try {
    const page = await getPage();

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    await fs.promises.writeFile(path.join(directory, `${format}.txt`), error.stack ?? '', { flag: 'w' });
    await fs.promises.writeFile(path.join(directory, `${format}.html`), await page.content(), { flag: 'w' });

    await page.screenshot({ fullPage: true, path: path.join(directory, `${format}.png`) });
  } catch (screenshotError) {
    console.error(screenshotError.stack);
    getAccountContext().logsService.logError(screenshotError.message);

    await fs.promises.writeFile(path.join(directory, `${format}-screenshot-error.txt`), screenshotError.stack ?? '', { flag: 'w' });
  }

  await killBrowser();

  return { allowContinue: error instanceof TimeoutError };
};

class ControllerService {
  private _timeout: NodeJS.Timeout | null = null;

  private _taskManager: TaskManager | null = null;

  private _isActive: boolean = false;

  private _refreshRequests: Set<number> = new Set<number>();

  private botState: BotState = BotState.None;

  public isActive = (): boolean => this._isActive;

  public state = (): BotState => this.botState;

  private setState = async (state: BotState): Promise<void> => {
    this.botState = state;

    await publishEvent(BotEvent.BotRunningChanged);
  };

  private setActivity = async (activity: boolean): Promise<void> => {
    this._isActive = activity;

    await publishPayloadEvent(BotEvent.BotActivityChanged, { isActive: activity });
  };

  public signIn = async (accountId: string): Promise<void> => {
    setAccountContext(accountId);
    accountService.setCurrentAccountId(accountId);

    let allowContinue = true;

    try {
      if (this.botState !== BotState.None) {
        return;
      }

      this.setState(BotState.Pending);

      await ensureLoggedIn();
      await ensureContextualHelpIsOff();
      await updateNewOldVillages();
      await initPlayerInfo();
      await updateHeroInformation();

      const allVillages = getAccountContext().villageService.allVillages();

      for (const village of shuffle(allVillages)) {
        const buildingQueueService = getAccountContext().buildingQueueService.for(village.id);
        await buildingQueueService.loadQueue();
        await ensureVillageSelected(village.id);

        await updateResources();
        await updateBuildings();
      }

      await updatePlayerInfo();
    } catch (error) {
      await handleError(error);
      allowContinue = false;
    }

    if (!allowContinue) {
      this.signOut();

      return;
    }

    const generalSettings = getAccountContext().settingsService.account.get();

    if (generalSettings.autoStart) {
      await this.start();
    } else {
      this.setState(BotState.Paused);
    }
  };

  public signOut = async (): Promise<void> => {
    resetAccountContext();
    accountService.setCurrentAccountId(null);
    this.setState(BotState.None);
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

    if (getAccountContext().nextExecutionService.tasks() > new Date()) {
      this._timeout = global.setTimeout(async () => {
        await this.execute();
      }, 1000);

      return;
    }

    this.setActivity(true);
    let allowContinue = true;
    let coolDown: CoolDown | undefined;

    try {
      await ensureLoggedIn();

      if (!this._taskManager) {
        this._taskManager = new TaskManager();
      }

      await this._taskManager.execute();
    } catch (error) {
      const result = await handleError(error);
      allowContinue = result.allowContinue;
      coolDown = result.coolDown;
    }

    if (!allowContinue) {
      this.setActivity(false);
      this.setState(BotState.Paused);

      return;
    }

    const tasksCoolDown = coolDown || getAccountContext().settingsService.account.get().tasksCoolDown;
    const nextTimeout = tasksCoolDown.getRandomDelay();

    const nextExecution = new Date();
    nextExecution.setSeconds(nextExecution.getSeconds() + nextTimeout);
    getAccountContext().nextExecutionService.setTasks(nextExecution);
    this.setActivity(false);

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
    await killBrowser();

    this.setState(BotState.Paused);
  };

  public requestVillageRefresh = (villageId: number) => {
    this._refreshRequests.add(villageId);
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
class ControllerServiceMock extends ControllerService {
  public state = (): BotState => BotState.Paused;
}

export const controllerService = new ControllerService();
// export const controllerService = new ControllerServiceMock();
