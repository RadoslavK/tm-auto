import { getPage } from '../../browser/getPage';
import { logException } from '../../../../_shared/utils/logException';

export const parseActiveVillageId = async (): Promise<number> => {
  const page = await getPage();
  const className = await page.$eval('#sidebarBoxVillagelist [href*=newdid][class=active]', x => x.getAttribute('href'));

  if (!className) {
    throw logException('Can not parse active village id');
  }

  const match = /newdid=(\d+)/.exec(className);

  if (!match) {
    throw logException('Can not parse active village id');
  }

  return +match[1];
};
