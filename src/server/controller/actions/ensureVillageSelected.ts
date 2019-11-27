import { accountContext } from '../../accountContext';
import { getPage } from '../../browser/getPage';

export const ensureVillageSelected = async (villageId: number): Promise<void> => {
  const { currentVillageId } = accountContext.villageService;

  if (currentVillageId !== villageId) {
    const page = await getPage();
    const switches = await page.$$('#sidebarBoxVillagelist [href*=newdid]');
    const villageSwitch = await switches.find(async (x) => {
      const url: string = await x.getProperty('href').then(href => href.jsonValue());

      return url.includes(villageId.toString());
    });

    if (!villageSwitch) {
      throw new Error(`Did not find village switch for village id: ${villageId}`);
    }

    await Promise.all([
      villageSwitch.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    accountContext.villageService.currentVillageId = villageId;
  }
};
