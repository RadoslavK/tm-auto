import { TravianPath } from '../_enums/TravianPath';
import { getPage, killBrowser } from '../browser/getPage';
import { context } from '../graphql/context';
import { parseActiveVillageId } from '../parsers/villages/parseActiveVillageId';
import { parseVillages } from '../parsers/villages/parseVillages';
import { log } from '../utils/log';
import { startBuilding } from './actions/build/startBuilding';
import { ensureLoggedIn } from './actions/ensureLoggedIn';
import { initPlayerInfo } from './actions/init/initPlayerInfo';
import { TaskManager } from './tasks/taskManager';

export class Controller {
  private _running: boolean = false;
  private _buildTimer: NodeJS.Timeout;

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
    context.villages.set(villages);
    context.villages.currentVillageId = await parseActiveVillageId();

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

  public build = async (): Promise<void> => {
    const { account } = context.user;

    const page = await getPage();
    await page.goto(`${account.server}/${TravianPath.ResourceFieldsOverview}`);

    await startBuilding();

    this._buildTimer = setTimeout(this.build, 20 * 1000);
    log('gonna build next in 20 seconds');
  };
}
