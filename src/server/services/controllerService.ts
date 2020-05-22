import fs from 'fs';

import { CoolDown } from '../_models/coolDown';
import { Duration } from '../_models/duration';
import { GeneralSettings } from '../_models/settings/generalSettings';
import {
  BotState,
  IMutationSignInArgs,
} from '../_types/graphql';
import { accountContext } from '../accountContext';
import {
  getPage,
  killBrowser,
} from '../browser/getPage';
import { updateBuildings } from '../controller/actions/buildings/updateBuildings';
import { ensureLoggedIn } from '../controller/actions/ensureLoggedIn';
import { ensureVillageSelected } from '../controller/actions/ensureVillageSelected';
import { initPlayerInfo } from '../controller/actions/player/initPlayerInfo';
import { updatePlayerInfo } from '../controller/actions/player/updatePlayerInfo';
import { updateNewOldVillages } from '../controller/actions/village/updateNewOldVillages';
import { updateResources } from '../controller/actions/village/updateResources';
import { TaskManager } from '../controller/tasks/taskManager';
import { BotEvent } from '../graphql/subscriptions/botEvent';
import { publishEvent } from '../graphql/subscriptions/pubSub';
import { updateHeroInformation } from '../parsers/hero/updateHeroInformation';
import { shuffle } from '../utils/shuffle';
import { accountService } from './accountService';
import { BuildingQueueService } from './buildingQueueService';

class ControllerService {
  private m_timeout: NodeJS.Timeout;
  private m_taskManager: TaskManager | null = null;

  private m_tasksCoolDown = new CoolDown({
    max: new Duration({ seconds: 35 }),
    min: new Duration({ seconds: 10 }),
  });

  private botState: BotState = BotState.None;

  public state = (): BotState => this.botState;

  private setState = async (state: BotState): Promise<void> => {
    this.botState = state;
    return publishEvent(BotEvent.BotRunningChanged);
  };

  public signIn = async (input: IMutationSignInArgs): Promise<void> => {
    const {
      accountId,
    } = input;

    let generalSettings: GeneralSettings;

    try {
      if (this.botState !== BotState.None) {
        return;
      }

      this.setState(BotState.Pending);

      await accountService.setCurrentAccountId(accountId);
      accountContext.initialize();

      await ensureLoggedIn();
      await updateNewOldVillages();
      await initPlayerInfo();
      await updateHeroInformation();

      const allVillages = accountContext.villageService.allVillages();

      for (const village of shuffle(allVillages)) {
        await new BuildingQueueService(village.id).loadQueue();
        await ensureVillageSelected(village.id);

        await updateResources();
        await updateBuildings();
      }

      await updatePlayerInfo();
    } catch (error) {
      console.error(error.stack);
      await this.signOut();
    } finally {
      generalSettings = accountContext.settingsService.general.get();
    }

    if (generalSettings.autoStart) {
      await this.start();
    } else {
      this.setState(BotState.Paused);
    }
  };

  public signOut = (): void => {
    accountService.setCurrentAccountId(null);
    this.setState(BotState.None);
  };

  public start = async (): Promise<void> => {
    this.setState(BotState.Running);
    await this.execute();
  };

  private execute = async (): Promise<void> => {
    try {
      await ensureLoggedIn();

      if (!this.m_taskManager) {
        this.m_taskManager = new TaskManager();
      }

      await this.m_taskManager.execute();
    } catch (error) {
      console.error(error.stack);
      // try to make screenshot
      try {
        const page = await getPage();
        const now = new Date();
        const format = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()},${now.getMinutes()},${now.getSeconds()}`;

        if (!fs.existsSync('./screenshots')) {
          fs.mkdirSync('./screenshots');
        }

        await page.screenshot({ fullPage: true, path: `.screenshots/${format}.png` });
        await fs.promises.writeFile(`.screenshots/${format}.txt`, error.stack, { flag: 'w' });
      } catch (screenshotError) {
        console.error(screenshotError.stack);
      }

      await killBrowser();
    }

    const nextTimeout = this.m_tasksCoolDown.randomDelay();

    const nextExecution = new Date();
    nextExecution.setSeconds(nextExecution.getSeconds() + nextTimeout);
    accountContext.nextExecutionService.setTasks(nextExecution);

    this.m_timeout = setTimeout(async () => {
      await this.execute();
    }, nextTimeout * 1000);
  };

  public stop = async (): Promise<void> => {
    this.setState(BotState.Stopping);

    if (this.m_timeout) {
      clearTimeout(this.m_timeout);
    }

    this.m_taskManager = null;
    await killBrowser();

    this.setState(BotState.Paused);
  };
}

// TODO: make better mocking
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
class ControllerServiceMock extends ControllerService {
  public state = (): BotState => BotState.Paused;
}

export const controllerService = new ControllerService();
// export const controllerService = new ControllerServiceMock();
