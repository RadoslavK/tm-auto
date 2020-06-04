import { TravianPath } from '../../../_enums/travianPath';
import { getAccountContext } from '../../../accountContext';
import { parseBuildingsInProgress } from '../../../parsers/buildings/parseBuildingsInProgress';
import {
  parseFieldSpots,
  parseFieldSpotsNew,
} from '../../../parsers/buildings/parseFieldSpots';
import { parseInfrastructureSpots } from '../../../parsers/buildings/parseInfrastructureSpots';
import { gameInfoService } from '../../../services/info/gameInfoService';
import { ensurePage } from '../ensurePage';

export const updateBuildings = async (): Promise<void> => {
  await ensurePage(TravianPath.ResourceFieldsOverview);

  const village = getAccountContext().villageService.currentVillage();
  const fieldSpots = gameInfoService.hasNewUI
    ? await parseFieldSpotsNew()
    : await parseFieldSpots();
  const buildingsInProgress = await parseBuildingsInProgress();

  village.buildings.updateActual(fieldSpots);
  village.buildings.updateOngoing(buildingsInProgress);

  await ensurePage(TravianPath.InfrastructureOverview);

  const infrastructureSpots = await parseInfrastructureSpots();
  village.buildings.updateActual(infrastructureSpots);

  const queueService = getAccountContext().buildingQueueService.for(village.id);
  queueService.removeAndCorrectQueue();
};
