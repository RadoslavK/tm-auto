import fs from 'fs';

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

    if (this.botState !== BotState.None) {
      return;
    }

    this.setState(BotState.Pending);

    accountService.currentAccountId = accountId;
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

    this.setState(BotState.Paused);
  };

  public signOut = (): void => {
    accountService.currentAccountId = null;
    this.setState(BotState.None);
  };

  public start = async (): Promise<void> => {
    this.setState(BotState.Running);
    await this.execute();

    this.m_timeout = setTimeout(async () => {
      await this.execute();
      this.m_timeout.refresh();
    }, 10 * 1000);
  };

  private execute = async (): Promise<void> => {
    try {
      await ensureLoggedIn();

      if (!this.m_taskManager) {
        this.m_taskManager = new TaskManager();
      }

      return await this.m_taskManager.execute();
    } catch (error) {
      console.error(error.stack);
      // try to make screenshot
      try {
        const page = await getPage();
        const now = new Date();
        const format = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()},${now.getMinutes()},${now.getSeconds()}`;
        await page.screenshot({ path: `.screenshots/${format}.png`, fullPage: true });
        await fs.promises.writeFile(`.screenshots/${format}.txt`, error.stack, { flag: 'w' });
      } catch(screenshotError) {
        console.error(screenshotError.stack);
      }

      await killBrowser();
      return undefined;
    }
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

export const controllerService = new ControllerService();
