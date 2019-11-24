import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId';
import { parseVillages } from '../../../parsers/villages/parseVillages';
import { publishEvent } from '../../../graphql/subscriptions/pubSub';
import { BotEvent } from '../../../graphql/subscriptions/botEvent';
import { accountContext } from '../../../accountContext';

export const updateNewOldVillages = async (): Promise<void> => {
  const villages = await parseVillages();

  accountContext.villageService.updateVillage(villages);
  accountContext.villageService.currentVillageId = await parseActiveVillageId();

  publishEvent(BotEvent.VillagesUpdated);
};
