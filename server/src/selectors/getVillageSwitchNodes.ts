import { ElementHandle} from 'puppeteer';
import { getPage } from '../browser/getPage';

export const getVillageSwitchNodes = async (): Promise<readonly ElementHandle<Element>[]> => {
  const page = await getPage();
  return await page.$$('#sidebarBoxVillagelist [href*=newdid]');
};
