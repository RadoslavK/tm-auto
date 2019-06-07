import { Page } from 'puppeteer';

export const parseActiveVillageId = async (page: Page): Promise<number> => {
  const className = await page.$eval('#sidebarBoxVillagelist [href*=newdid][class=active]', x => x.getAttribute('href'));
  const match = /newdid=(\d+)/.exec(className);
  return +match[1];
};
