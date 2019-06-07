import { TravianPath } from '../_enums/TravianPath';
import { BuildingSpot } from '../_models/buildings/buildingSpot';
import { Village } from '../_models/village';
import { context } from '../graphql/context';
import { ensureLoggedIn } from './actions/ensureLoggedIn';
import { getPage, killBrowser } from './browser/getPage';
import { parseInfrastructureSpots } from '../parsers/buildings/parseInfrastructureSpots';
import { parseFieldSpots } from '../parsers/buildings/parseFieldSpots';
import { parseBuildingsInProgress } from '../parsers/buildings/parseBuildingsInProgress';

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
    const fieldSpots = await parseFieldSpots(page);
    const buildingsInProgress = await parseBuildingsInProgress(page);

    await page.goto(`${userAccount.server}/${TravianPath.InfrastructureOverview}`);
    const infrastructureSpots = await parseInfrastructureSpots(page);

    const buildings: readonly BuildingSpot[] = fieldSpots.concat(infrastructureSpots);

    if (context.villageService.getVillages().length == 0) {
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
