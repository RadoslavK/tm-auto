import { TravianPath } from '../../../_enums/travianPath';
import { accountContext } from '../../../accountContext';
import { parseAllyId } from '../../../parsers/player/parseAllyId';
import { parseCapitalVillageCoords } from '../../../parsers/player/parseCapitalVillageCoords';
import { BuildingQueueService } from '../../../services/buildingQueueService';
import { ensurePage } from '../ensurePage';

export const updatePlayerInfo = async (): Promise<void> => {
  await ensurePage(TravianPath.PlayerProfile);

  const capitalCoords = await parseCapitalVillageCoords();
  const { capitalChanged } = accountContext.villageService.setCapital(capitalCoords);

  accountContext.gameInfo.allyId = await parseAllyId();

  if (capitalChanged) {
    const { currentVillageId } = accountContext.villageService;
    new BuildingQueueService(currentVillageId).correctBuildingQueue();
  }
};