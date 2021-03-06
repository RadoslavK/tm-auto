import type {
  ElementHandle,
  Page, 
} from 'puppeteer-core';
import type { BuildingType } from 'shared/enums/BuildingType.js';

import {
  getBuildingSpotPath,
  TravianPath, 
} from '../../_enums/travianPath.js';
import { browserManager } from '../../browser/browserManager.js';
import {
  isInfrastructure,
  isResourceField, 
} from '../../utils/buildingUtils.js';
import { validateUrl } from '../../utils/validateUrl.js';

const navigateByLink = async (
  path: string,
  exact: boolean,
  page: Page,
): Promise<boolean> => {
  const selectors = exact
    ? [`[href="/${path}"]`, `[href^="/${path}?"]`]
    : [`[href^="/${path}"]`];

  let link: ElementHandle | null = null;

  for (const selector of selectors) {
    link = await page.$(selector);

    if (link) {
      break;
    }
  }

  if (!link) {
    return false;
  }

  try {
    await Promise.all([
      page.evaluate((el) => el.click(), link),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  } catch {
    throw new Error(`Failed to load page: ${path}`);
  }

  return true;
};

const navigateByOnClick = async (
  path: string,
  exact: boolean,
  page: Page,
): Promise<boolean> => {
  const selector = exact
    ? `[onclick="window.location.href='${path}'"]`
    : `[onclick^="window.location.href='${path}"]`;
  const link = await page.$(selector);

  if (!link) {
    return false;
  }

  try {
    await Promise.all([
      link.evaluate((node) => node.dispatchEvent(new Event('click'))),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  } catch {
    throw new Error(`Failed to load page: ${path}`);
  }

  return true;
};

const navigateByJQuery = async (
  path: string,
  exact: boolean,
  page: Page,
): Promise<boolean> => {
  const pageContent = await page.content();

  const regexpPattern = exact
    ? `"id":"(.*?)","redirectUrl":"${path}"`
    : `"id":"(.*?)","redirectUrl":"${path}.*?"`;
  const redirectElementIdMatch = new RegExp(regexpPattern).exec(pageContent);

  if (!redirectElementIdMatch) {
    return false;
  }

  const [, redirectElementId] = redirectElementIdMatch;

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

const navigate = async (
  path: string,
  exact: boolean,
  page: Page,
): Promise<void> => {
  if (await navigateByLink(path, exact, page)) {
    return;
  }

  if (await navigateByOnClick(path, exact, page)) {
    return;
  }

  if (await navigateByJQuery(path, exact, page)) {
    return;
  }

  throw new Error(
    `Did not find url link nor onclick redirect nor redirect  element, requested page: ${path}`,
  );
};

export const ensurePage = async (
  path: string,
  exact = false,
  existingPage?: Page,
): Promise<void> => {
  const page = existingPage || (await browserManager.getPage());
  const url = page.url();

  const isAtUrl = (exact && url === path) || (!exact && url.includes(path));

  if (isAtUrl) {
    return;
  }

  await navigate(path, exact, page);

  await validateUrl([path], exact, page);
};

export const ensurePageTab = async (
  path: string,
  tab: TabInformation,
  page?: Page,
) => {
  await ensurePage(path, false, page);

  await ensurePage(`${path}?${tab.name}=${tab.index}`, false, page);
};

export type TabInformation = {
  readonly index: number;
  readonly name: string;
};

export const ensureBuildingSpotPage = async (
  fieldId: number,
  buildingType?: BuildingType,
  tab?: TabInformation,
): Promise<void> => {
  const page = await browserManager.getPage();
  const spotPath = getBuildingSpotPath(fieldId);

  if (spotPath !== page.url()) {
    if (isResourceField(fieldId)) {
      await ensurePage(TravianPath.ResourceFieldsOverview);
    } else if (isInfrastructure(fieldId)) {
      await ensurePage(TravianPath.InfrastructureOverview);
    }

    await ensurePage(spotPath);
  }

  if (tab === undefined) {
    return;
  }

  await ensurePage(getBuildingSpotPath(fieldId, buildingType, tab));
};
