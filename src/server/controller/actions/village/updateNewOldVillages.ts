import { getAccountContext } from '../../../accountContext';
import { BotEvent } from '../../../events/botEvent';
import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId';
import { parseVillages } from '../../../parsers/villages/parseVillages';
import { publishPayloadEvent } from '../../../pubSub';

export const updateNewOldVillages = async (): Promise<void> => {
  const villages = await parseVillages();

  getAccountContext().villageService.updateVillages(villages);
  getAccountContext().villageService.currentVillageId = await parseActiveVillageId();

  publishPayloadEvent(BotEvent.VillagesUpdated, { villages });
};
