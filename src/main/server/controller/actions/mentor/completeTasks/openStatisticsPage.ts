import { TravianPath } from '../../../../_enums/travianPath.js';
import { ensurePage } from '../../ensurePage.js';

export const openStatisticsPage = async (): Promise<void> => {
  await ensurePage(TravianPath.Statistics);
};
