import { TravianPath } from '../../../_enums/travianPath.js';
import { AccountContext } from '../../../accountContext.js';
import { parseBuildingsInProgress } from '../../../parsers/buildings/parseBuildingsInProgress.js';
import { parseFieldSpots } from '../../../parsers/buildings/parseFieldSpots.js';
import { parseInfrastructureSpots } from '../../../parsers/buildings/parseInfrastructureSpots.js';
import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId.js';
import { ensurePage } from '../ensurePage.js';
import { ensureVillageSelected } from '../ensureVillageSelected.js';

export const updateBuildings = async (): Promise<void> => {
  let success = false;

  do {
    await ensurePage(TravianPath.ResourceFieldsOverview);

    const village = AccountContext.getContext().villageService.currentVillage();
    const fieldSpots = await parseFieldSpots();
    let activeVillageId = await parseActiveVillageId();

    if (activeVillageId !== village.id) {
      await ensureVillageSelected(village.id);

      continue;
    }

    await ensurePage(TravianPath.InfrastructureOverview);

    const infrastructureSpots = await parseInfrastructureSpots(village.tribe);
    const buildingsInProgress = await parseBuildingsInProgress();
    const actualBuildings = fieldSpots.concat(infrastructureSpots);
    activeVillageId = await parseActiveVillageId();

    if (activeVillageId !== village.id) {
      await ensureVillageSelected(village.id);

      continue;
    }

    await village.buildings.update({
      actual: actualBuildings,
      ongoing: buildingsInProgress,
      triggerMainBuildingsUpdatedEvent: true,
    });

    const queueService = AccountContext.getContext().buildingQueueService.for(village.id);
    queueService.removeAndCorrectQueue({
      triggerCorrectionEvent: true,
    });

    success = true;
  } while (!success);
};
