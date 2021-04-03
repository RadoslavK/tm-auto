import { AccountContext } from '../../../accountContext.js';
import { BotEvent } from '../../../events/botEvent.js';
import { publishPayloadEvent } from '../../../pubSub.js';
import { updateBuildings } from '../buildings/updateBuildings.js';
import { ensureVillageSelected } from '../ensureVillageSelected.js';
import { updateResources } from './updateResources.js';

export const refreshVillage = async (villageId: string): Promise<void> => {
  await ensureVillageSelected(villageId);

  await updateResources();
  await updateBuildings();

  const village = AccountContext.getContext().villageService.village(villageId);
  publishPayloadEvent(BotEvent.VillageUpdated, { village });
};
