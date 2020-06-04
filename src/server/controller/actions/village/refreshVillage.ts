import { updateBuildings } from '../buildings/updateBuildings';
import { ensureVillageSelected } from '../ensureVillageSelected';
import { updateResources } from './updateResources';

export const refreshVillage = async (villageId: number): Promise<void> => {
  await ensureVillageSelected(villageId);

  await updateResources();
  await updateBuildings();
};