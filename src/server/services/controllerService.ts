import { killBrowser } from '../browser/getPage';
import { shuffle } from '../utils/shuffle';
import { updateBuildings } from '../controller/actions/build/updateBuildings';
import { ensureLoggedIn } from '../controller/actions/ensureLoggedIn';
import { ensureVillageSelected } from '../controller/actions/ensureVillageSelected';
import { initPlayerInfo } from '../controller/actions/init/initPlayerInfo';
import { updateNewOldVillages } from '../controller/actions/village/updateNewOldVillages';
import { updateResources } from '../controller/actions/village/updateResources';
import { TaskManager } from '../controller/tasks/taskManager';
import { publishEvent } from '../graphql/subscriptions/pubSub';
import { Events } from '../graphql/subscriptions/events';
import { BuildingQueueService } from './buildingQueueService';
import { accountContext } from '../accountContext';

class ControllerService {
  private m_running = false;

  private m_timeout: NodeJS.Timeout;
  private m_taskManager: TaskManager | null = null;

  public isRunning = (): boolean => this.m_running;

  public start = async (): Promise<void> => {
    if (this.m_running) {
      return;
    }

    this.m_running = true;
    publishEvent(Events.BotRunningChanged);

    await ensureLoggedIn();
    await initPlayerInfo();
    await updateNewOldVillages();

    const allVillages = accountContext.villageService.allVillages();

    for (const village of shuffle(allVillages)) {
      await new BuildingQueueService(village.id).loadQueue();
      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();
    }

    await this.execute();

    this.m_timeout = setTimeout(async () => {
      await this.execute();
      this.m_timeout.refresh();
    }, 10 * 1000);
  };

  private execute = async (): Promise<void> => {
    try {
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
    if (this.m_timeout) {
      clearTimeout(this.m_timeout);
    }

    this.m_taskManager = null;
    this.m_running = false;
    await killBrowser();

    publishEvent(Events.BotRunningChanged);
  };
}

export const controllerService = new ControllerService();