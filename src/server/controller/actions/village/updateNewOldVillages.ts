import { accountContext } from '../../../accountContext';
import { BotEvent } from '../../../graphql/subscriptions/botEvent';
import { publishEvent } from '../../../graphql/subscriptions/pubSub';
import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId';
import { parseVillages } from '../../../parsers/villages/parseVillages';

export const updateNewOldVillages = async (): Promise<void> => {
  const villages = await parseVillages();

  accountContext.villageService.updateVillages(villages);
  accountContext.villageService.currentVillageId = await parseActiveVillageId();

  publishEvent(BotEvent.VillagesUpdated);
};
