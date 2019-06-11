import { TravianPath } from '../_enums/TravianPath';
import { BuildingSpot } from '../_models/buildings/buildingSpot';
import { context } from '../graphql/context';
import { parseBuildingsInProgress } from '../parsers/buildings/parseBuildingsInProgress';
import { parseFieldSpots } from '../parsers/buildings/parseFieldSpots';
import { parseInfrastructureSpots } from '../parsers/buildings/parseInfrastructureSpots';
import { parseActiveVillageId } from '../parsers/villages/parseActiveVillageId';
import { parseVillageCapacity } from '../parsers/villages/parseVillageCapacity';
import { parseVillageProduction } from '../parsers/villages/parseVillageProduction';
import { parseVillageResources } from '../parsers/villages/parseVillageResources';
import { parseVillages } from '../parsers/villages/parseVillages';
import { log } from '../utils/log';
import { startBuilding } from './actions/build/startBuilding';
import { ensureLoggedIn } from './actions/ensureLoggedIn';
import { initPlayerInfo } from './actions/init/initPlayerInfo';
import { getPage, killBrowser } from '../browser/getPage';

export class Controller {
  private _buildTimer: NodeJS.Timeout;

  public start = async (): Promise<void> => {
    const page = await getPage();

    await ensureLoggedIn(page);
    await initPlayerInfo(page);

    const villages = await parseVillages(page);
    context.villageService.setVillages(villages);

    const activeVillageId = await parseActiveVillageId(page);
    context.villageService.setActiveVillageId(activeVillageId);

    await this.build();
  };

  public stop = async (): Promise<void> => {
    clearTimeout(this._buildTimer);
    await killBrowser();
  };

  public build = async (): Promise<void> => {
    const page = await getPage();
    const { userAccount } = context.userService;

    log('checking fields');
    await page.goto(`${userAccount.server}/${TravianPath.ResourceFieldsOverview}`);

    const resources = await parseVillageResources(page);
    const capacity = await parseVillageCapacity(page);
    const production = await parseVillageProduction(page);
    const village = context.villageService.currentVillage();
    village.resources.capacity = capacity;
    village.resources.production = production;
    village.resources.amount = resources;

    const fieldSpots = await parseFieldSpots(page);
    const buildingsInProgress = await parseBuildingsInProgress(page);

    await page.goto(`${userAccount.server}/${TravianPath.InfrastructureOverview}`);
    const infrastructureSpots = await parseInfrastructureSpots(page);

    const buildings: readonly BuildingSpot[] = fieldSpots.concat(infrastructureSpots);

    const villageId = context.villageService.currentVillageId();
    context.buildingsService.setBuildingSpots(villageId, buildings);
    context.buildingsService.setBuildingsInProgress(villageId, buildingsInProgress);

    await startBuilding(page);

    this._buildTimer = setTimeout(this.build, 20 * 1000);
    log('gonna build next in 20 seconds');
  };
}
