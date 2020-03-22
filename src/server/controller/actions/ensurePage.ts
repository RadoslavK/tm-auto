import { ElementHandle } from 'puppeteer';

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

const navigateByLink = async (path: string): Promise<boolean> => {
  const page = await getPage();
  const link = await page.$(`[href="${path}"]`);

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

const navigateByOnClick = async (path: string): Promise<boolean> => {
  const page = await getPage();
  const link = await page.$(`[onclick="window.location.href='${path}'"]`);

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

const navigateByJQuery = async (path: string): Promise<boolean> => {
  const page = await getPage();
  const pageContent = await page.content();

  const regexpPattern = `"id":"(.*?)","redirectUrl":"${path}"`;
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

const getRidOfOnBoardingUi = async (): Promise<void> => {
  const page = await getPage();
  let forwardOnBoardingElement: ElementHandle | null = null;

  do {
    try {
      forwardOnBoardingElement = await page.$('.chevronForward:not(.hide)');

      if (forwardOnBoardingElement) {
        await forwardOnBoardingElement.click();
      }
    } catch {
      break;
    }
  } while (forwardOnBoardingElement);
};

const navigate = async (path: string): Promise<void> => {
  //  maybe stupid UI onboarding is blocking buttons or something
  await getRidOfOnBoardingUi();

  if (await navigateByLink(path)) {
    return;
  }

  if (await navigateByOnClick(path)) {
    return;
  }

  if (await navigateByJQuery(path)) {
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

  await navigate(path);

  await validateUrl([path], exact);
};

export interface ITabInformation {
  readonly index: number;
  readonly name: string;
}

export const ensureBuildingSpotPage = async (fieldId: number, tab: ITabInformation | undefined = undefined): Promise<void> => {
  //  TODO: spravit to efektivnejsie a celkovo ensure navigaciu. ked uz je na tej budove tak sa nemusi davat na resource fieldy atd
  if (isResourceField(fieldId)) {
    await ensurePage(TravianPath.ResourceFieldsOverview);
  } else if (isInfrastructure(fieldId)) {
    await ensurePage(TravianPath.InfrastructureOverview);
  }

  await ensurePage(getBuildingSpotPath(fieldId), true);

  if (tab === undefined) {
    return;
  }

  await ensurePage(getBuildingSpotPath(fieldId, tab));
};
