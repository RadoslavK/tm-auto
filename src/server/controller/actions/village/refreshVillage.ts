import { getAccountContext } from '../../../accountContext';
import { BotEvent } from '../../../events/botEvent';
import { publishPayloadEvent } from '../../../pubSub';
import { updateBuildings } from '../buildings/updateBuildings';
import { ensureVillageSelected } from '../ensureVillageSelected';
import { updateResources } from './updateResources';

export const refreshVillage = async (villageId: string): Promise<void> => {
  await ensureVillageSelected(villageId);

  await updateResources();
  await updateBuildings();

  const village = getAccountContext().villageService.village(villageId);
  publishPayloadEvent(BotEvent.VillageUpdated, { village });
};