import { TravianPath } from '../../../_enums/travianPath.js';
import { getAccountContext } from '../../../accountContext.js';
import { parseBuildingsInProgress } from '../../../parsers/buildings/parseBuildingsInProgress.js';
import { parseFieldSpots } from '../../../parsers/buildings/parseFieldSpots.js';
import { parseInfrastructureSpots } from '../../../parsers/buildings/parseInfrastructureSpots.js';
import { ensurePage } from '../ensurePage.js';

export const updateBuildings = async (): Promise<void> => {
  await ensurePage(TravianPath.ResourceFieldsOverview);

  const village = getAccountContext().villageService.currentVillage();
  const fieldSpots = await parseFieldSpots();
  const buildingsInProgress = await parseBuildingsInProgress();

  village.buildings.updateActual(fieldSpots);
  village.buildings.updateOngoing(buildingsInProgress);

  await ensurePage(TravianPath.InfrastructureOverview);

  const infrastructureSpots = await parseInfrastructureSpots();
  village.buildings.updateActual(infrastructureSpots);

  const queueService = getAccountContext().buildingQueueService.for(village.id);
  queueService.removeAndCorrectQueue();
};
