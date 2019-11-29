import { ElementHandle } from 'puppeteer';

import { accountContext } from '../../accountContext';
import { getPage } from '../../browser/getPage';

const getVillageSwitch = async (switches: readonly ElementHandle[], villageId: number): Promise<ElementHandle> => {
  for (const villageSwitch of switches) {
    const url = await villageSwitch.evaluate(x => x.getAttribute('href'));

    if (!url) {
      throw new Error('Failed to get village switch url');
    }

    if (url.includes(villageId.toString())) {
      return villageSwitch;
    }
  }

  throw new Error(`Did not find village switch for village id: ${villageId}`);
};

export const ensureVillageSelected = async (villageId: number): Promise<void> => {
  const { currentVillageId } = accountContext.villageService;

  if (currentVillageId !== villageId) {
    const page = await getPage();
    const switches = await page.$$('#sidebarBoxVillagelist [href*=newdid]');
    const villageSwitch = await getVillageSwitch(switches, villageId);

    await Promise.all([
      villageSwitch.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    accountContext.villageService.currentVillageId = villageId;
  }
};
