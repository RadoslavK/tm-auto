import { killBrowser } from '../browser/getPage';
import { shuffle } from '../utils/shuffle';
import { updateBuildings } from './actions/build/updateBuildings';
import { ensureLoggedIn } from './actions/ensureLoggedIn';
import { ensureVillageSelected } from './actions/ensureVillageSelected';
import { initPlayerInfo } from './actions/init/initPlayerInfo';
import { updateNewOldVillages } from './actions/village/updateNewOldVillages';
import { updateResources } from './actions/village/updateResources';
import { TaskManager } from './tasks/taskManager';
import { villagesService } from '../services/villageService';
import { publishEvent } from '../graphql/subscriptions/pubSub';
import { Events } from '../graphql/subscriptions/events';

export class Controller {
  private m_running = false;

  private m_timeout: NodeJS.Timeout;
  private m_taskManager: TaskManager;

  public isRunning = (): boolean => this.m_running;

  public start = async (): Promise<void> => {
    this.m_running = true;
    publishEvent(Events.BotRunningChanged);

    if (!this.m_taskManager) {
      this.m_taskManager = new TaskManager();
    }

    await ensureLoggedIn();
    await initPlayerInfo();
    await updateNewOldVillages();

    const allVillages = villagesService.get().all();

    for (const village of shuffle(allVillages)) {
      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();
    }

    await this.m_taskManager.execute();
    this.m_timeout = setTimeout(async () => {
      await this.m_taskManager.execute();
      this.m_timeout.refresh();
    }, 10 * 1000);
  };

  public stop = async (): Promise<void> => {
    if (this.m_timeout) {
      clearTimeout(this.m_timeout);
    }

    this.m_running = false;
    publishEvent(Events.BotRunningChanged);
    await killBrowser();
  };
}
