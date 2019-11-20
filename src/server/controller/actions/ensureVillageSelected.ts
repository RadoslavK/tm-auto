import { getPage } from '../../browser/getPage';
import { logException } from '../../../../_shared/utils/logException';
import { villagesService } from '../../services/villageService';

export const ensureVillageSelected = async (villageId: number): Promise<void> => {
  const { currentVillageId } = villagesService.get();

  if (currentVillageId !== villageId) {
    const page = await getPage();
    const switches = await page.$$('#sidebarBoxVillagelist [href*=newdid]');
    const villageSwitch = await switches.find(async (x) => {
      const url: string = await x.getProperty('href').then(href => href.jsonValue());

      return url.includes(villageId.toString());
    });

    if (!villageSwitch) {
      throw logException(`did not find village switch for villageId: ${villageId}`);
    }

    await Promise.all([
      villageSwitch.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    villagesService.get().currentVillageId = villageId;
  }
};