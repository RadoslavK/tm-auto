import { killBrowser } from '../browser/getPage';
import { shuffle } from '../utils/shuffle';
import { updateBuildings } from '../controller/actions/buildings/updateBuildings';
import { ensureLoggedIn } from '../controller/actions/ensureLoggedIn';
import { ensureVillageSelected } from '../controller/actions/ensureVillageSelected';
import { initPlayerInfo } from '../controller/actions/player/initPlayerInfo';
import { updateNewOldVillages } from '../controller/actions/village/updateNewOldVillages';
import { updateResources } from '../controller/actions/village/updateResources';
import { TaskManager } from '../controller/tasks/taskManager';
import { publishEvent } from '../graphql/subscriptions/pubSub';
import { BotEvent } from '../graphql/subscriptions/botEvent';
import { BuildingQueueService } from './buildingQueueService';
import { accountContext } from '../accountContext';
import {
  IBotState,
  IMutationSignInArgs,
} from '../_types/graphql';
import { accountService } from './accountService';
import { updateHeroInformation } from '../parsers/hero/updateHeroInformation';

class ControllerService {
  private m_timeout: NodeJS.Timeout;
  private m_taskManager: TaskManager | null = null;

  private botState: IBotState = IBotState.None;

  public state = (): IBotState => this.botState;

  private setState = async (state: IBotState): Promise<void> => {
    this.botState = state;
    return publishEvent(BotEvent.BotRunningChanged);
  };

  public signIn = async (input: IMutationSignInArgs): Promise<void> => {
    const {
      accountId,
    } = input;

    if (this.botState !== IBotState.None) {
      return;
    }

    this.setState(IBotState.Pending);

    accountService.currentAccountId = accountId;
    accountContext.initialize();

    await ensureLoggedIn();
    await initPlayerInfo();
    await updateNewOldVillages();
    await updateHeroInformation();

    const allVillages = accountContext.villageService.allVillages();

    for (const village of shuffle(allVillages)) {
      await new BuildingQueueService(village.id).loadQueue();
      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();
    }

    this.setState(IBotState.Paused);
  };

  public signOut = (): void => {
    accountService.currentAccountId = null;
    this.setState(IBotState.None);
  };

  public start = async (): Promise<void> => {
    this.setState(IBotState.Running);
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
      await killBrowser();
      return undefined;
    }
  };

  public stop = async (): Promise<void> => {
    this.setState(IBotState.Stopping);

    if (this.m_timeout) {
      clearTimeout(this.m_timeout);
    }

    this.m_taskManager = null;
    await killBrowser();

    this.setState(IBotState.Paused);
  };
}

export const controllerService = new ControllerService();