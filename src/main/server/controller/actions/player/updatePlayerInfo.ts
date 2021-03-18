import { TravianPath } from '../../../_enums/travianPath.js';
import { getAccountContext } from '../../../accountContext.js';
import { parseAllyId } from '../../../parsers/gameInfo/parseAllyId.js';
import { parseCapitalVillageCoords } from '../../../parsers/gameInfo/parseCapitalVillageCoords.js';
import { ensurePage } from '../ensurePage.js';

export const updatePlayerInfo = async (): Promise<void> => {
  await ensurePage(TravianPath.PlayerProfile);

  const capitalCoords = await parseCapitalVillageCoords();
  const { capitalChanged } = getAccountContext().villageService.setCapital(
    capitalCoords,
  );

  getAccountContext().gameInfo.allyId = await parseAllyId();

  if (capitalChanged) {
    const { currentVillageId } = getAccountContext().villageService;
    const queueService = getAccountContext().buildingQueueService.for(
      currentVillageId,
    );
    queueService.removeAndCorrectQueue();
  }
};
