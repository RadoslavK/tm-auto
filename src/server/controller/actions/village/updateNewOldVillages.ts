import { publishEvent } from '../../../_graphql/pubSub';
import { accountContext } from '../../../accountContext';
import { BotEvent } from '../../../events/botEvent';
import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId';
import { parseVillages } from '../../../parsers/villages/parseVillages';

export const updateNewOldVillages = async (): Promise<void> => {
  const villages = await parseVillages();

  accountContext.villageService.updateVillages(villages);
  accountContext.villageService.currentVillageId = await parseActiveVillageId();

  publishEvent(BotEvent.VillagesUpdated);
};
