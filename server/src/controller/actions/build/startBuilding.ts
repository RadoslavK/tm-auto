import { Page } from 'puppeteer';
import { logException } from '../../../../../_shared/utils/invariantException';
import { context } from '../../../graphql/context';
import { log } from '../../../utils/log';
import { ensureUrl } from '../ensureUrl';
import { TravianPath } from '../../../_enums/TravianPath';

export const isResourceField = (fieldId: number): boolean => fieldId >= 1 && fieldId <= 18;
export const isBuildingField = (fieldId: number): boolean => fieldId >= 19 && fieldId <= 40;

const isValidField = (fieldId: number): boolean => isResourceField(fieldId) || isBuildingField(fieldId);

export const startBuilding = async (page: Page): Promise<void> => {
  const villageId = context.villageService.currentVillage().id;
  const queue = context.buildingsService.buildingQueue(villageId);
  const building = queue.popFirst();

  if (!building) {
    return;
  }

  const { userAccount } = context.userService;
  const {
    fieldId,
  } = building;

  if (!isValidField(fieldId)) {
    logException(`Tried to build at invalid field id: ${fieldId}`);
  }

  if (isResourceField(fieldId)) {
    await ensureUrl(TravianPath.ResourceFieldsOverview)
  } else if (isBuildingField(fieldId)) {
    await ensureUrl(TravianPath.InfrastructureOverview)
  }

  log(`building at ${building.fieldId}`);
  await page.goto(`${userAccount.server}/build.php?id=${fieldId}`);

  const submit = await page.$x(`//button[contains(@onclick, "${fieldId}")]`);
  await submit[0].click();
};

