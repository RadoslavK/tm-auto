import { TravianPath } from '../../../_enums/TravianPath';
import { parseBuildingsInProgress } from '../../../parsers/buildings/parseBuildingsInProgress';
import { parseFieldSpots } from '../../../parsers/buildings/parseFieldSpots';
import { parseInfrastructureSpots } from '../../../parsers/buildings/parseInfrastructureSpots';
import { BuildingQueueService } from '../../../services/buildingQueueService';
import { ensurePage } from '../ensurePage';
import { villagesService } from '../../../services/villageService';

export const updateBuildings = async (): Promise<void> => {
  await ensurePage(TravianPath.ResourceFieldsOverview);

  const village = villagesService.get().village();
  const fieldSpots = await parseFieldSpots();
  const buildingsInProgress = await parseBuildingsInProgress();

  village.buildings.updateActual(fieldSpots);
  village.buildings.updateOngoing(buildingsInProgress);

  await ensurePage(TravianPath.InfrastructureOverview);

  const infrastructureSpots = await parseInfrastructureSpots();
  village.buildings.updateActual(infrastructureSpots);

  const queueService = new BuildingQueueService(village.id);
  queueService.correctBuildingQueue();
  queueService.serializeQueue();
};
