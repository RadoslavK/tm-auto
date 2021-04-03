import { TravianPath } from '../../../_enums/travianPath.js';
import { AccountContext } from '../../../accountContext.js';
import { parseAllyId } from '../../../parsers/gameInfo/parseAllyId.js';
import { parseCapitalVillageCoords } from '../../../parsers/gameInfo/parseCapitalVillageCoords.js';
import { ensurePage } from '../ensurePage.js';

export const updatePlayerInfo = async (): Promise<void> => {
  await ensurePage(TravianPath.PlayerProfile);

  const capitalCoords = await parseCapitalVillageCoords();
  const { capitalChanged } = AccountContext.getContext().villageService.setCapital(
    capitalCoords,
  );

  AccountContext.getContext().gameInfo.allyId = await parseAllyId();

  if (capitalChanged) {
    const { currentVillageId } = AccountContext.getContext().villageService;
    const queueService = AccountContext.getContext().buildingQueueService.for(
      currentVillageId,
    );
    queueService.removeAndCorrectQueue({
      triggerCorrectionEvent: true,
    });
  }
};
