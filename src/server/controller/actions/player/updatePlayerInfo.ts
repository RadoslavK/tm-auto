import { ensurePage } from '../ensurePage';
import { TravianPath } from '../../../_enums/TravianPath';
import { parseCapitalVillageCoords } from '../../../parsers/player/parseCapitalVillageCoords';
import { accountContext } from '../../../accountContext';
import { BuildingQueueService } from '../../../services/buildingQueueService';
import { parseAllyId } from '../../../parsers/player/parseAllyId';

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