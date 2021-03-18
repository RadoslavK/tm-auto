import { TravianPath } from '../../../../_enums/travianPath.js';
import { ensurePageTab } from '../../ensurePage.js';

export const openSurroundingReports = async (): Promise<void> => {
  await ensurePageTab(TravianPath.Reports, { name: 't', index: 6 });
};
