import { getPage } from '../../browser/getPage.js';

export const parseActiveVillageId = async (): Promise<string> => {
  const page = await getPage();
  const className = await page.$eval(
    '#sidebarBoxVillagelist [href*=newdid][class=active]',
    (x) => x.getAttribute('href'),
  );

  if (!className) {
    throw new Error('Failed to parse active village id');
  }

  const match = /newdid=(\d+)/.exec(className);

  if (!match) {
    throw new Error('Failed to parse active village id');
  }

  return match[1];
};
