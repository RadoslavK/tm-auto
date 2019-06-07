import { TravianPath } from '../_enums/TravianPath';
import { BuildingSpot } from '../_models/buildings/buildingSpot';
import { Village } from '../_models/village';
import { context } from '../graphql/context';
import { parseBuildingsInProgress } from '../parsers/buildings/parseBuildingsInProgress';
import { parseFieldSpots } from '../parsers/buildings/parseFieldSpots';
import { parseInfrastructureSpots } from '../parsers/buildings/parseInfrastructureSpots';
import { log } from '../utils/log';
import { startBuilding } from './actions/build/startBuilding';
import { ensureLoggedIn } from './actions/ensureLoggedIn';
import { initPlayerInfo } from './actions/init/initPlayerInfo';
import { getPage, killBrowser } from '../browser/getPage';

export class Controller {
  private _buildTimer: NodeJS.Timeout;

  public start = async () => {
    const page = await getPage();

    await ensureLoggedIn(page);
    await initPlayerInfo(page);

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
    const fieldSpots = await parseFieldSpots(page);
    const buildingsInProgress = await parseBuildingsInProgress(page);

    await page.goto(`${userAccount.server}/${TravianPath.InfrastructureOverview}`);
    const infrastructureSpots = await parseInfrastructureSpots(page);

    const buildings: readonly BuildingSpot[] = fieldSpots.concat(infrastructureSpots);

    if (context.villageService.villages().length == 0) {
      const villages: readonly Village[] = [
        new Village({
          id: 1,
          name: 'Village 1',
        }),
      ];

      context.villageService.setVillages(villages);
    }
    context.buildingsService.setBuildingSpots(1, buildings);
    context.buildingsService.setBuildingsInProgress(1, buildingsInProgress);

    await startBuilding(page);

    this._buildTimer = setTimeout(this.build, 20 * 1000);
    log('gonna build next in 20 seconds');
  };
}
