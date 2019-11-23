import { getBuildingSpotPath, TravianPath } from '../../_enums/TravianPath';
import { getPage } from '../../browser/getPage';
import { isInfrastructure, isResourceField } from '../../utils/buildingUtils';

export const ensurePage = async (path: string, exact = false): Promise<void> => {
  const page = await getPage();
  const url = page.url();

  const isAtUrl = (exact && url === path)
    || (!exact && url.includes(path));

  if (isAtUrl) {
    return;
  }

  let isHrefLink;
  let link = await page.$(`[href*="${path}"]`);

  if (!link) {
    //  might be an onclick event
    link = await page.$(`[onclick*="${path}"]`);

    if (!link) {
      //  can be redirect through jquery
      const pageContent = await page.content();

      const regexpPattern = `"id":"(.*?)","redirectUrl":"${path}"`;
      const redirectElementIdMatch = new RegExp(regexpPattern).exec(pageContent);

      if (!redirectElementIdMatch) {
        throw new Error(`Did not find url link nor onclick redirect nor redirect  element, requested page: ${path}`);
      }

      const redirectElementId = redirectElementIdMatch[1];

      const redirectElement = await page.$(`#${redirectElementId}`);

      if (!redirectElement) {
        throw new Error(`Did not find url link nor onclick redirect nor redirect  element, requested page: ${path}`);
      }

      await Promise.all([
        redirectElement.click(),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      ]);

      return;
    }

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
  //  TODO: spravit to efektivnejsie a celkovo ensure navigaciu. ked uz je na tej budove tak sa nemusi davat na resource fieldy atd
  if (isResourceField(fieldId)) {
    await ensurePage(TravianPath.ResourceFieldsOverview);
  } else if (isInfrastructure(fieldId)) {
    await ensurePage(TravianPath.InfrastructureOverview);
  }

  await ensurePage(getBuildingSpotPath(fieldId), true);
};
