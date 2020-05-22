import { TravianPath } from '../../_enums/travianPath';
import { Tribe } from '../../../_shared/types/tribe';
import { getPage } from '../../browser/getPage';
import { ensurePage } from '../../controller/actions/ensurePage';
import { gameInfoService } from '../../services/info/gameInfoService';

export const parseTribe = async (): Promise<Tribe> => {
  const page = await getPage();

  if (gameInfoService.hasNewUI) {
    //  Can be detected only from infrastructure layout
    // await ensurePage(TravianPath.InfrastructureOverview);
    //
    // const className = await page.$eval('[class~="buildingSlot"]', x => x.className);
    // const match = /[^\s]*$/.exec(className);
    //
    // if (!match) {
    //   throw new Error('Failed to parse tribe');
    // }
    //
    // switch (match[0]) {
    //   case 'roman': return Tribe.Romans;
    //   case 'teuton': return Tribe.Teutons;
    //   case 'gaul': return Tribe.Gauls;
    //   default:
    //     throw new Error(`Unknown tribe found: ${match}`);
    // }

    // or from resource overview
    await ensurePage(TravianPath.ResourceFieldsOverview);

    const className = await page.$eval('#resourceFieldContainer', x => x.className);

    const match = /tribe(\d+)/.exec(className);

    if (!match) {
      throw new Error('Failed to parse tribe');
    }

    const tribeIndex = +match[1];

    if (tribeIndex < Tribe.Romans || tribeIndex > Tribe.Huns) {
      throw new Error(`Unknown tribe index: ${tribeIndex}`);
    }

    return tribeIndex;
  }

  const className = await page.$eval('[class*=tribe]', e => e.className);
  const match = /tribe(\d+)/.exec(className);

  if (!match) {
    throw new Error('Failed to parse tribe');
  }

  const tribeIndex = +match[1];

  if (tribeIndex < Tribe.Romans || tribeIndex > Tribe.Huns) {
    throw new Error(`Unknown tribe index: ${tribeIndex}`);
  }

  return tribeIndex as Tribe;
};
