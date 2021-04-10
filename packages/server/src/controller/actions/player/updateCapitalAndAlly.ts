import { TravianPath } from '../../../_enums/travianPath.js';
import type { Coords } from '../../../_models/coords.js';
import { AccountContext } from '../../../accountContext.js';
import { parseAllyId } from '../../../parsers/gameInfo/parseAllyId.js';
import { parseCapitalVillageCoords } from '../../../parsers/gameInfo/parseCapitalVillageCoords.js';
import { ensurePage } from '../ensurePage.js';

const correctVillage = async (villId: string): Promise<void> => {
  const queueService = AccountContext.getContext().buildingQueueService.for(villId);

  await queueService.removeAndCorrectQueue({
    triggerCorrectionEvent: true,
  });
};

export const updateCapitalAndAlly = async (ensureCapVillageExists = true): Promise<Coords> => {
  await ensurePage(TravianPath.PlayerProfile);

  AccountContext.getContext().gameInfo.allyId = await parseAllyId();
  const capitalCoords = await parseCapitalVillageCoords();
  const { oldCapVillageId, newCapVillageId } = AccountContext.getContext().villageService.setCapital(capitalCoords, ensureCapVillageExists);

  if (oldCapVillageId) {
    await correctVillage(oldCapVillageId);
  }

  if (newCapVillageId) {
    await correctVillage(newCapVillageId);
  }

  return capitalCoords;
};
