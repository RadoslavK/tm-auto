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

  await ensurePage(TravianPath.InfrastructureOverview);

  const infrastructureSpots = await parseInfrastructureSpots(village.tribe);
  const buildingsInProgress = await parseBuildingsInProgress();
  const actualBuildings = fieldSpots.concat(infrastructureSpots);

  await village.buildings.update({
    actual: actualBuildings,
    ongoing: buildingsInProgress,
    triggerMainBuildingsUpdatedEvent: true,
  });

  const queueService = AccountContext.getContext().buildingQueueService.for(village.id);
  queueService.removeAndCorrectQueue({
    triggerCorrectionEvent: true,
  });
};
