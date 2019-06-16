import { getPage } from '../../browser/getPage';
import { context } from '../../graphql/context';
import { getVillageSwitchNodes} from '../../selectors/getVillageSwitchNodes';

export const ensureVillageSelected = async (villageId: number): Promise<void> => {
  const { currentVillageId } = context.villages;

  if (currentVillageId !== villageId) {
    const switches = await getVillageSwitchNodes();
    const villageSwitch = await switches.find(async (x) => {
      const url: string = await x.getProperty('href').then(href => href.jsonValue());

      return url.includes(villageId.toString());
    });

    const page = await getPage();
    await Promise.all([
      villageSwitch.click(),
    ]);

    context.villages.currentVillageId = villageId;
  }
};
