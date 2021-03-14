import { TravianPath } from '../../../../_enums/travianPath';
import { ensurePage } from '../../ensurePage';

export const openStatisticsPage = async (): Promise<void> => {
  await ensurePage(TravianPath.Statistics);
};
