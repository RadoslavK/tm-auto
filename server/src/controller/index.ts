import { TravianPath } from '../_enums/TravianPath';
import { Building } from '../_models/buildings/building';
import { Village } from '../_models/village';
import { IBuilding, IVillage } from '../_types/graphql';
import { context } from '../graphql/context';
import { ensureLoggedIn } from './actions/ensureLoggedIn';
import { getPage, killBrowser } from './browser/getPage';
import { parseBuildings } from './parsers/parseBuildings';
import { parseResourceFields } from './parsers/parseResourceFields';
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
    const page = await getPage();
    const { userAccount } = context.userService;
    log('checking fields');
    await page.goto(`${userAccount.server}/${TravianPath.ResourceFieldsOverview}`);
    const resFields = await parseResourceFields();
    const queue = await parseOngoingQueue();

    await page.goto(`${userAccount.server}/${TravianPath.BuildingsOverview}`);
    const buildingFields = await parseBuildings();

    const buildings: readonly Building[] = resFields.concat(buildingFields);

    queue.buildings.forEach(b => {
      const building = buildings[b.fieldId - 1];

      building.level.ongoing = b.level;
      building.type = b.type;
    });

    if (context.villageService.getVillages().length == 0) {
      const villages: readonly IVillage[] = [
        new Village({
          id: '1',
          name: 'Village 1',
        }),
      ];

      context.villageService.setVillages(villages);
    }
    context.buildingsService.setVillageBuildings('1', buildings);

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
