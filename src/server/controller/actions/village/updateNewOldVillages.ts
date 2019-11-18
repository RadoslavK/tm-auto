import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId';
import { parseVillages } from '../../../parsers/villages/parseVillages';
import { villagesService } from '../../../services/villageService';

export const updateNewOldVillages = async (): Promise<void> => {
  const villages = await parseVillages();

  villagesService.get().update(villages);
  villagesService.get().currentVillageId = await parseActiveVillageId();
};
