import { BuildingType } from '../../../../../../_shared/enums/BuildingType.js';
import { getAccountContext } from '../../../../accountContext.js';
import { getPage } from '../../../../browser/getPage.js';
import { ensureBuildingSpotPage } from '../../ensurePage.js';

export const createMarketOffer = async (): Promise<boolean> => {
  const { villageService } = getAccountContext();

  const building = villageService
    .currentVillage()
    .buildings.spots.buildings()
    .find((b) => b.type === BuildingType.Marketplace && b.level.actual >= 1);

  if (!building) {
    return false;
  }

  await ensureBuildingSpotPage(building.fieldId, { name: 't', index: 2 });

  const page = await getPage();

  const offerInput = await page.$('input[name="m1"]');

  if (!offerInput) {
    throw new Error('Did not find offer input');
  }

  const receiveInput = await page.$('input[name="m2"]');

  if (!receiveInput) {
    throw new Error('Did not find receive input');
  }

  const submitButton = await page.$('button[type="submit"]');

  if (!submitButton) {
    throw new Error('Did not find submit button');
  }

  await offerInput.type('1');
  await receiveInput.type('1');

  await submitButton.click();

  const cancelOffer = await page.waitForSelector(
    '#sell_overview tbody tr:first-child td:first-child',
  );

  if (!cancelOffer) {
    throw new Error('Did not find a button to cancel the offer');
  }

  await Promise.all([
    cancelOffer.click(),
    page.waitFor(() => !document.querySelector('#sell_overview')),
  ]);

  return true;
};
