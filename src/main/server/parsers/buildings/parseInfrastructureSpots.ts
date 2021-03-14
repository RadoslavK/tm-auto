import { BuildingType } from '../../../../_shared/enums/BuildingType';
import { TravianPath } from '../../_enums/travianPath';
import { ActualBuilding } from '../../_models/buildings/actual/actualBuilding';
import { Tribe } from '../../_models/enums/tribe';
import { getAccountContext } from '../../accountContext';
import { getPage } from '../../browser/getPage';
import { fieldIds } from '../../constants/fieldIds';
import { isInfrastructure } from '../../utils/buildingUtils';
import { validateUrl } from '../../utils/validateUrl';

const acceptedUrls: readonly string[] = [TravianPath.InfrastructureOverview];

const getWallType = (): BuildingType => {
  const { tribe } = getAccountContext().gameInfo;

  switch (tribe) {
    case Tribe.Egyptians:
      return BuildingType.StoneWall;

    case Tribe.Romans:
      return BuildingType.CityWall;

    case Tribe.Teutons:
      return BuildingType.EarthWall;

    case Tribe.Gauls:
      return BuildingType.Palisade;

    case Tribe.Huns:
      return BuildingType.MakeshiftWall;

    default:
      throw new Error(`Unknown player tribe: ${tribe}`);
  }
};

export const parseInfrastructureSpots = async (): Promise<
  readonly ActualBuilding[]
> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();
  await page.waitForSelector('#village_map');

  const nodes = await page.$$('#village_map > .buildingSlot');

  const buildings = await Promise.all(
    nodes.map(
      async (node): Promise<ActualBuilding | null> => {
        const className = await node
          .getProperty('className')
          .then((classNode) => classNode.jsonValue());
        const fieldIdMatch = /a(\d+)/.exec(className as string);

        if (!fieldIdMatch) {
          throw new Error('Failed to parse field id');
        }

        const fieldId = +fieldIdMatch[1];

        if (!isInfrastructure(fieldId)) {
          return null;
        }

        const typeMatch = /g(\d+)/.exec(className as string);

        if (!typeMatch) {
          throw new Error('Failed to parse building type');
        }

        let type: BuildingType = +typeMatch[1];

        const level =
          type === BuildingType.None
            ? 0
            : +(await node.$eval(
                '.labelLayer',
                (levelNode) => (levelNode as HTMLElement).innerText,
              ));

        if (fieldId === fieldIds.RallyPoint) {
          type = BuildingType.RallyPoint;
        } else if (fieldId === fieldIds.Wall) {
          type = getWallType();
        }

        return new ActualBuilding({
          fieldId,
          level,
          type,
        });
      },
    ),
  );

  const uniqueFieldIds: number[] = [];

  return buildings.filter((b) => {
    if (b && !uniqueFieldIds.includes(b.fieldId)) {
      uniqueFieldIds.push(b.fieldId);
      return true;
    }

    return false;
  }) as readonly ActualBuilding[];
};
