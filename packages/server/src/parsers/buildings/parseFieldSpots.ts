import { TravianPath } from '../../_enums/travianPath.js';
import type { ActualBuilding } from '../../_models/buildings/actual/actualBuilding.js';
import { browserManager } from '../../browser/browserManager.js';
import { validateUrl } from '../../utils/validateUrl.js';

const acceptedUrls: readonly string[] = [TravianPath.ResourceFieldsOverview];

export const parseFieldSpots = async (): Promise<ActualBuilding[]> => {
  await validateUrl(acceptedUrls);

  const page = await browserManager.getPage();

  return page.$$eval(
    '#resourceFieldContainer a.level[class*=buildingSlot][class*=gid]',
    (xx) =>
      xx.map(
        (x): ActualBuilding => {
          const match = /gid(\d+).*?buildingSlot(\d+).*?level(\d+)/.exec(
            x.className,
          );

          if (!match) {
            throw new Error('Failed to parse resource field spot');
          }

          return {
            fieldId: +match[2],
            level: +match[3],
            type: +match[1],
          };
        },
      ),
  );
};
