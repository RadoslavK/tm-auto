import { getPage } from '../../browser/getPage';
import { context } from '../../graphql/context';

export const ensureVillageSelected = async (villageId: number): Promise<void> => {
  const { currentVillageId } = context.villages;

  if (currentVillageId !== villageId) {
    const page = await getPage();
    const switches = await page.$$('#sidebarBoxVillagelist [href*=newdid]');
    const villageSwitch = await switches.find(async (x) => {
      const url: string = await x.getProperty('href').then(href => href.jsonValue());

      return url.includes(villageId.toString());
    });

    await Promise.all([
      villageSwitch.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    context.villages.currentVillageId = villageId;
  }
};
