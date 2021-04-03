import {
  AccountContext,
} from '../../../accountContext.js';
import { BotEvent } from '../../../events/botEvent.js';
import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId.js';
import { parseVillages } from '../../../parsers/villages/parseVillages.js';
import { publishPayloadEvent } from '../../../pubSub.js';

export const updateNewOldVillages = async (): Promise<void> => {
  const villages = await parseVillages();

  const { villageService } = AccountContext.getContext();
  villageService.updateVillages(villages);
  villageService.currentVillageId = await parseActiveVillageId();

  const currentVillages = villageService.allVillages();

  publishPayloadEvent(BotEvent.VillagesUpdated, { villages: currentVillages });
};
