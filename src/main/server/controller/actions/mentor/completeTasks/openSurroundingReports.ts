import { TravianPath } from '../../../../_enums/travianPath';
import { ensurePageTab } from '../../ensurePage';

export const openSurroundingReports = async (): Promise<void> => {
  await ensurePageTab(TravianPath.Reports, { name: 't', index: 6 });
};
