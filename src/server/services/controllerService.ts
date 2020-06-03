import fs from 'fs';
import { TimeoutError } from 'puppeteer/Errors';

import { BotState } from '../../_shared/types/botState';
import {
  AccountContext,
  getAccountContext,
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
import { BuildingQueueService } from './buildingQueueService';

type HandleErrorResult = {
  readonly allowContinue: boolean;
};

const handleError = async (error: Error): Promise<HandleErrorResult> => {
  console.error(error.stack);
  getAccountContext().logsService.logError(error.message);

  const now = new Date();
  const format = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()},${now.getMinutes()},${now.getSeconds()}`;

  // try to make screenshot
  try {
    const page = await getPage();

    if (!fs.existsSync('.screenshots')) {
      fs.mkdirSync('.screenshots');
    }

    await fs.promises.writeFile(`.screenshots/${format}.txt`, error.stack ?? '', { flag: 'w' });
    await fs.promises.writeFile(`.screenshots/${format}.html`, await page.content(), { flag: 'w' });

    await page.screenshot({ fullPage: true, path: `.screenshots/${format}.png` });
  } catch (screenshotError) {
    console.error(screenshotError.stack);
    getAccountContext().logsService.logError(screenshotError.message);

    await fs.promises.writeFile(`.screenshots/${format}-screenshot-error.txt`, screenshotError.stack ?? '', { flag: 'w' });
  }

  await killBrowser();

  return { allowContinue: error instanceof TimeoutError };
};

class ControllerService {
  private _timeout: NodeJS.Timeout | null = null;
  private _taskManager: TaskManager | null = null;
  private _isActive: boolean = false;

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
    let allowContinue = true;

    try {
      if (this.botState !== BotState.None) {
        return;
      }

      this.setState(BotState.Pending);

      await accountService.setCurrentAccountId(accountId);
      Object.assign(getAccountContext, new AccountContext());

      await ensureLoggedIn();
      await ensureContextualHelpIsOff();
      await updateNewOldVillages();
      await initPlayerInfo();
      await updateHeroInformation();

      const allVillages = getAccountContext().villageService.allVillages();

      for (const village of shuffle(allVillages)) {
        await new BuildingQueueService(village.id).loadQueue();
        await ensureVillageSelected(village.id);

        await updateResources();
        await updateBuildings();
      }

      await updatePlayerInfo();
    } catch (error) {
      const result = await handleError(error);
      allowContinue = result.allowContinue;
    }

    if (!allowContinue) {
      this.signOut();

      return;
    }

    const generalSettings = getAccountContext().settingsService.general.get();

    if (generalSettings.autoStart) {
      await this.start();
    } else {
      this.setState(BotState.Paused);
    }
  };

  public signOut = async (): Promise<void> => {
    accountService.setCurrentAccountId(null);
    this.setState(BotState.None);
  };

  public start = async (): Promise<void> => {
    this.setState(BotState.Running);
    await this.execute();
  };

  private execute = async (): Promise<void> => {
    this.setActivity(true);
    let allowContinue = true;

    try {
      await ensureLoggedIn();

      if (!this._taskManager) {
        this._taskManager = new TaskManager();
      }

      await this._taskManager.execute();
    } catch (error) {
      const result = await handleError(error);
      allowContinue = result.allowContinue;
    }

    if (!allowContinue) {
      this.setActivity(false);
      this.setState(BotState.Paused);

      return;
    }

    const { tasksCoolDown } = getAccountContext().settingsService.general.get();
    const nextTimeout = tasksCoolDown.getRandomDelay();

    const nextExecution = new Date();
    nextExecution.setSeconds(nextExecution.getSeconds() + nextTimeout);
    getAccountContext().nextExecutionService.setTasks(nextExecution);
    this.setActivity(false);

    this._timeout = setTimeout(async () => {
      await this.execute();
    }, nextTimeout * 1000);
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
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
class ControllerServiceMock extends ControllerService {
  public state = (): BotState => BotState.Paused;
}

export const controllerService = new ControllerService();
// export const controllerService = new ControllerServiceMock();
