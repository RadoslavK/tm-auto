import {
  getBuildingSpotPath,
  TravianPath,
} from '../../_enums/travianPath';
import { getPage } from '../../browser/getPage';
import {
  isInfrastructure,
  isResourceField,
} from '../../utils/buildingUtils';
import { validateUrl } from '../../utils/validateUrl';

const navigateByLink = async (path: string, exact: boolean): Promise<boolean> => {
  const page = await getPage();
  const selector = exact
    ? `[href="${path}"]`
    : `[href^="${path}"]`;
  const link = await page.$(selector);

  if (!link) {
    return false;
  }

  try {
    await Promise.all([
      page.evaluate(el => el.click(), link),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  } catch {
    throw new Error(`Failed to load page: ${path}`);
  }

  return true;
};

const navigateByOnClick = async (path: string, exact: boolean): Promise<boolean> => {
  const page = await getPage();
  const selector = exact
    ? `[onclick="window.location.href='${path}'"]`
    : `[onclick^="window.location.href='${path}"]`;
  const link = await page.$(selector);

  if (!link) {
    return false;
  }

  try {
    await Promise.all([
      link.evaluate(node => node.dispatchEvent(new Event('click'))),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  } catch {
    throw new Error(`Failed to load page: ${path}`);
  }

  return true;
};

const navigateByJQuery = async (path: string, exact: boolean): Promise<boolean> => {
  const page = await getPage();
  const pageContent = await page.content();

  const regexpPattern = exact
    ? `"id":"(.*?)","redirectUrl":"${path}"`
    : `"id":"(.*?)","redirectUrl":"${path}.*?"`;
  const redirectElementIdMatch = new RegExp(regexpPattern).exec(pageContent);

  if (!redirectElementIdMatch) {
    return false;
  }

  const redirectElementId = redirectElementIdMatch[1];

  const redirectElement = await page.$(`#${redirectElementId}`);

  if (!redirectElement) {
    throw new Error('Did not find redirect element for redirect id');
  }

  try {
    await Promise.all([
      redirectElement.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  } catch {
    throw new Error(`Failed to load page: ${path}`);
  }

  return true;
};

const navigate = async (path: string, exact: boolean): Promise<void> => {
  if (await navigateByLink(path, exact)) {
    return;
  }

  if (await navigateByOnClick(path, exact)) {
    return;
  }

  if (await navigateByJQuery(path, exact)) {
    return;
  }

  throw new Error(`Did not find url link nor onclick redirect nor redirect  element, requested page: ${path}`);
};

export const ensurePage = async (path: string, exact = false): Promise<void> => {
  const page = await getPage();
  const url = page.url();

  const isAtUrl = (exact && url === path)
    || (!exact && url.includes(path));

  if (isAtUrl) {
    return;
  }

  await navigate(path, exact);

  await validateUrl([path], exact);
};

export type TabInformation = {
  readonly index: number;
  readonly name: string;
};

export const ensureBuildingSpotPage = async (fieldId: number, tab?: TabInformation): Promise<void> => {
  const page = await getPage();
  const spotPath = getBuildingSpotPath(fieldId);

  if (spotPath !== page.url()) {
    if (isResourceField(fieldId)) {
      await ensurePage(TravianPath.ResourceFieldsOverview);
    } else if (isInfrastructure(fieldId)) {
      await ensurePage(TravianPath.InfrastructureOverview);
    }

    await ensurePage(spotPath, true);
  }

  if (tab === undefined) {
    return;
  }

  await ensurePage(getBuildingSpotPath(fieldId, tab));
};
