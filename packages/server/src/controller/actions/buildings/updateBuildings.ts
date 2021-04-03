import { TravianPath } from '../../../_enums/travianPath.js';
import { AccountContext } from '../../../accountContext.js';
import { parseBuildingsInProgress } from '../../../parsers/buildings/parseBuildingsInProgress.js';
import { parseFieldSpots } from '../../../parsers/buildings/parseFieldSpots.js';
import { parseInfrastructureSpots } from '../../../parsers/buildings/parseInfrastructureSpots.js';
import { ensurePage } from '../ensurePage.js';

export const updateBuildings = async (): Promise<void> => {
  await ensurePage(TravianPath.ResourceFieldsOverview);

  const village = AccountContext.getContext().villageService.currentVillage();
  const fieldSpots = await parseFieldSpots();
  const buildingsInProgress = await parseBuildingsInProgress();

  village.buildings.updateActual(fieldSpots);
  village.buildings.updateOngoing(buildingsInProgress);

  await ensurePage(TravianPath.InfrastructureOverview);

  const infrastructureSpots = await parseInfrastructureSpots();
  village.buildings.updateActual(infrastructureSpots);

  const queueService = AccountContext.getContext().buildingQueueService.for(village.id);
  queueService.removeAndCorrectQueue({
    triggerCorrectionEvent: true,
  });
};
