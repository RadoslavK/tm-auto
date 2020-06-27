import { TravianPath } from '../../../../_enums/travianPath';
import { ensurePage } from '../../ensurePage';

export const openMap = async (): Promise<void> => {
  await ensurePage(TravianPath.CenterMap);
};
