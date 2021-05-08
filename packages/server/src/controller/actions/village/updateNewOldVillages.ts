import { Tribe } from 'shared/enums/Tribe.js';

import { TravianPath } from '../../../_enums/travianPath.js';
import { Coords } from '../../../_models/coords.js';
import { AccountContext } from '../../../accountContext.js';
import { browserManager } from '../../../browser/browserManager.js';
import { BotEvent } from '../../../events/botEvent.js';
import { parseActiveVillageId } from '../../../parsers/villages/parseActiveVillageId.js';
import { parseVillages } from '../../../parsers/villages/parseVillages.js';
import { publishPayloadEvent } from '../../../pubSub.js';
import { activityService } from '../../../services/botActivityService.js';
import { ensurePage } from '../ensurePage.js';

export const updateNewOldVillages = async (): Promise<void> => {
  activityService.setActivity('Updating villages');
  const villages = await parseVillages();

  const { villageService } = AccountContext.getContext();
  villageService.updateVillages(villages);
  villageService.currentVillageId = await parseActiveVillageId();

  const currentVillages = villageService.allVillages();

  const notScannedVillages = currentVillages.filter(v => !v.scanned);

  if (notScannedVillages.length) {
    const { factions, accountTribe } = AccountContext.getContext().gameInfo;
    //  Set tribe
    if (!factions) {
      notScannedVillages.forEach(v => {
        v.tribe = accountTribe;
      });
    } else {
      await ensurePage(TravianPath.PlayerProfile);

      const page = await browserManager.getPage();
      const villageRows = await page.$$('#villages tbody tr');

      for (const villageRow of villageRows) {
        const coordsMatch = await villageRow.$eval('.coords a', x => /x=(.*?)&y=(.*)/.exec(x.getAttribute('href') || ''));

        if (!coordsMatch) {
          throw new Error('Failed to parse village coords');
        }

        const coords = new Coords({ x: +coordsMatch[1], y: +coordsMatch[2] });

        const village = notScannedVillages.find(v => v.coords.equalsTo(coords));

        if (!village) {
          continue;
        }

        let tribe = await villageRow.$eval('i[class*=tribe]', x => /(\d+)/.exec(x.className)?.[1]);

        if (!tribe) {
          throw new Error('Failed to parse village tribe');
        }

        if (+tribe < Tribe.Romans || +tribe > Tribe.Huns) {
          throw new Error(`Unknown village tribe ${tribe}`);
        }

        village.tribe = +tribe;
      }
    }
  }

  publishPayloadEvent(BotEvent.VillagesUpdated, { villages: currentVillages });
};
