import { TravianPath } from '../../../_enums/travianPath';
import { accountContext } from '../../../accountContext';
import { parseBuildingsInProgress } from '../../../parsers/buildings/parseBuildingsInProgress';
import { parseFieldSpots } from '../../../parsers/buildings/parseFieldSpots';
import { parseInfrastructureSpots } from '../../../parsers/buildings/parseInfrastructureSpots';
import { BuildingQueueService } from '../../../services/buildingQueueService';
import { ensurePage } from '../ensurePage';

export const updateBuildings = async (): Promise<void> => {
  await ensurePage(TravianPath.ResourceFieldsOverview);

  const village = accountContext.villageService.currentVillage();
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
