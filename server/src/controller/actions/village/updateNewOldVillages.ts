import { context } from '../../../graphql/context';
import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId';
import { parseVillages } from '../../../parsers/villages/parseVillages';

export const updateNewOldVillages = async (): Promise<void> => {
  const villages = await parseVillages();

  context.villages.update(villages);
  context.villages.currentVillageId = await parseActiveVillageId();
};
