import { ElementHandle } from 'puppeteer';
import { getPage } from '../browser/getPage';

export const getBuildingSpot = async (fieldId: number): Promise<ElementHandle<Element>> => {
  const page = await getPage();

  return await page.$(`[href*="build.php?id=${fieldId}"]`);
};
