import { ensureLoggedIn } from './actions/ensureLoggedIn';
import { killBrowser } from './browser/getPage';
import { ensureUrl } from './actions/ensureUrl';
import { TravianPath } from '../../../_shared/contract/enums/TravianPath';
import { parseResourceFields } from './parsers/parseResourceFields';
import { villageData } from '../graphql/resolvers/village';
import { parseOngoingQueue } from './parsers/parseOngoingQueue';

export class Controller {
  private _buildTimer: NodeJS.Timeout;

  public start = async () => {
    await ensureLoggedIn();

    await this.build();
  };

  public stop = async () => {
    clearTimeout(this._buildTimer);
    await killBrowser();
  };

  public build = async () => {
    log('checking fields');
    await ensureUrl(TravianPath.ResourceFieldsOverview);
    const buildings = await parseResourceFields();
    const queue = await parseOngoingQueue();

    queue.buildings.forEach(b => {
      buildings[b.fieldId - 1].type = b.type;
      buildings[b.fieldId - 1].level.ongoing++;
    });

    villageData.villages =villageData.villages.map(village => ({
      ...village,
      buildings,
    }));

    // log('building...');
    // await startBuilding({ fieldId: 7 });

    this._buildTimer = setTimeout(this.build, 20 * 1000);
    log('gonna build next in 20 seconds');
  };
}

const log = (message: string) => {
  const now = new Date();
  const hours = now.getHours() > 9 ? `${now.getHours()}` : `0${now.getHours()}`;
  const mins = now.getMinutes() > 9 ? `${now.getMinutes()}` : `0${now.getMinutes()}`;
  const sec = now.getSeconds() > 9 ? `${now.getSeconds()}` : `0${now.getSeconds()}`;
  const time = `${hours}:${mins}:${sec}`;
  console.log(`${time}: ${message}`);
};
