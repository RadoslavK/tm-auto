import { TravianPath } from '../../../_enums/travianPath';
import { getAccountContext } from '../../../accountContext';
import { parseAllyId } from '../../../parsers/gameInfo/parseAllyId';
import { parseCapitalVillageCoords } from '../../../parsers/gameInfo/parseCapitalVillageCoords';
import { ensurePage } from '../ensurePage';

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
