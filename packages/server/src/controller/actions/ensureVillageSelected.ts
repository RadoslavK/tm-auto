import type { ElementHandle } from 'puppeteer-core';

import { AccountContext } from '../../accountContext.js';
import { browserManager } from '../../browser/browserManager.js';
import { parseActiveVillageId } from '../../parsers/villages/parseActiveVillageId.js';
import { activityService } from '../../services/botActivityService.js';

const getVillageSwitch = async (
  switches: readonly ElementHandle[],
  villageId: string,
): Promise<ElementHandle> => {
  for (const villageSwitch of switches) {
    const url = await villageSwitch.evaluate((x) => x.getAttribute('href'));

    if (!url) {
      throw new Error('Failed to get village switch url');
    }

    if (url.includes(villageId)) {
      return villageSwitch;
    }
  }

  throw new Error(`Did not find village switch for village id: ${villageId}`);
};

export const ensureVillageSelected = async (
  villageId: string,
): Promise<void> => {
  const { name } = AccountContext.getContext().villageService.village(villageId);
  const { currentVillageId } = AccountContext.getContext().villageService;

  if (currentVillageId === villageId) {
    return;
  }

  activityService.setActivity(`Selecting village ${name}`);

  const page = await browserManager.getPage();
  const switches = await page.$$('#sidebarBoxVillagelist [href*=newdid]');
  const villageSwitch = await getVillageSwitch(switches, villageId);

  await Promise.all([
    villageSwitch.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);

  AccountContext.getContext().villageService.currentVillageId = await parseActiveVillageId();
};
