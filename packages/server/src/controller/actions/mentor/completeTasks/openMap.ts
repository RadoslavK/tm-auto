import { TravianPath } from '../../../../_enums/travianPath.js';
import { ensurePage } from '../../ensurePage.js';

export const openMap = async (): Promise<void> => {
  await ensurePage(TravianPath.CenterMap);
};
