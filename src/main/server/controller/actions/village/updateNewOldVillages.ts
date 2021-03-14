import { getAccountContext } from '../../../accountContext';
import { BotEvent } from '../../../events/botEvent';
import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId';
import { parseVillages } from '../../../parsers/villages/parseVillages';
import { publishPayloadEvent } from '../../../pubSub';

export const updateNewOldVillages = async (): Promise<void> => {
  const villages = await parseVillages();

  const { villageService } = getAccountContext();
  villageService.updateVillages(villages);
  villageService.currentVillageId = await parseActiveVillageId();

  const currentVillages = villageService.allVillages();

  publishPayloadEvent(BotEvent.VillagesUpdated, { villages: currentVillages });
};
