import { TravianPath } from '../../_enums/travianPath';
import { ActualBuilding } from '../../_models/buildings/actual/actualBuilding';
import { getPage } from '../../browser/getPage';
import { validateUrl } from '../../utils/validateUrl';

const acceptedUrls: readonly string[] = [TravianPath.ResourceFieldsOverview];

export const parseFieldSpots = async (): Promise<ActualBuilding[]> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();

  return page.$$eval(
    '#resourceFieldContainer div.level[class*=buildingSlot][class*=gid]',
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
