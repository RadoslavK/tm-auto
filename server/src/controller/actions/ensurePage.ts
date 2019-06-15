import { getBuildingSpotPath, TravianPath } from '../../_enums/TravianPath';
import { getPage } from '../../browser/getPage';
import { isInfrastructure, isResourceField } from './build/startBuilding';

export const ensurePage = async (path: string, exact: boolean = false): Promise<void> => {
  const page = await getPage();
  const url = page.url();

  const isAtUrl = (exact && url === path)
    || (!exact && url.includes(path));

  if (isAtUrl) {
    return;
  }

  let isHrefLink;
  let link =
    await page.$(`[href*="${path}"]`);

  if (!link) {
    //  might be an onclick event
    link = await page.$(`[onclick*="${path}"]`);
    isHrefLink = false;
  } else {
    isHrefLink = true;
  }

  await Promise.all([
    isHrefLink ? page.evaluate(el => el.click(), link) : link.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);
};

export const ensureBuildingSpotPage = async (fieldId: number): Promise<void> => {
  if (isResourceField(fieldId)) {
    await ensurePage(TravianPath.ResourceFieldsOverview);
  } else if (isInfrastructure(fieldId)) {
    await ensurePage(TravianPath.InfrastructureOverview);
  }

  await ensurePage(getBuildingSpotPath(fieldId), true);
};
