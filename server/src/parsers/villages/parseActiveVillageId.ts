import { getPage } from '../../browser/getPage';

export const parseActiveVillageId = async (): Promise<number> => {
  const page = await getPage();
  const className = await page.$eval('#sidebarBoxVillagelist [href*=newdid][class=active]', x => x.getAttribute('href'));
  const match = /newdid=(\d+)/.exec(className);
  return +match[1];
};
