import { TravianPath } from '../../../_enums/TravianPath';
import { context } from '../../../graphql/context';
import { parseBuildingsInProgress } from '../../../parsers/buildings/parseBuildingsInProgress';
import { parseFieldSpots } from '../../../parsers/buildings/parseFieldSpots';
import { parseInfrastructureSpots } from '../../../parsers/buildings/parseInfrastructureSpots';
import { BuildingQueueManager } from '../../../services/buildingQueueManager';
import { ensurePage } from '../ensurePage';

export const updateBuildings = async (): Promise<void> => {
  await ensurePage(TravianPath.ResourceFieldsOverview);

  const village = context.villages.village();
  const fieldSpots = await parseFieldSpots();
  const buildingsInProgress = await parseBuildingsInProgress();

  village.buildings.updateActual(fieldSpots);
  village.buildings.updateOngoing(buildingsInProgress);

  await ensurePage(TravianPath.InfrastructureOverview);

  const infrastructureSpots = await parseInfrastructureSpots();
  village.buildings.updateActual(infrastructureSpots);

  new BuildingQueueManager(village.id).correctBuildingQueue();
};
