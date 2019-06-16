import { killBrowser } from '../browser/getPage';
import { context } from '../graphql/context';
import { parseActiveVillageId } from '../parsers/villages/parseActiveVillageId';
import { parseVillages } from '../parsers/villages/parseVillages';
import { updateBuildings } from './actions/build/updateBuildings';
import { ensureLoggedIn } from './actions/ensureLoggedIn';
import { ensureVillageSelected } from './actions/ensureVillageSelected';
import { initPlayerInfo } from './actions/init/initPlayerInfo';
import { updateResources } from './actions/village/updateResources';
import { TaskManager } from './tasks/taskManager';

export class Controller {
  private _running: boolean = false;

  private _timeout: NodeJS.Timeout;
  private _taskManager: TaskManager;

  public isRunning = (): boolean => this._running;

  public start = async (): Promise<void> => {
    this._running = true;

    if (!this._taskManager) {
      this._taskManager = new TaskManager();
    }

    await ensureLoggedIn();
    await initPlayerInfo();

    const villages = await parseVillages();

    await villages.forEach(async (village) => {
      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();
    });

    context.villages.set(villages);
    context.villages.currentVillageId = await parseActiveVillageId();

    await this._taskManager.execute();
    this._timeout = setTimeout(async () => {
      await this._taskManager.execute();
      this._timeout.refresh();
    }, 10 * 1000);
  };

  public stop = async (): Promise<void> => {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._running = false;
    await killBrowser();
  };
}
