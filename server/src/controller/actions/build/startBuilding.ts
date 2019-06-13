import { logException } from '../../../../../_shared/utils/invariantException';
import { getPage } from '../../../browser/getPage';
import { context } from '../../../graphql/context';
import { log } from '../../../utils/log';
import { ensurePage } from '../ensurePage';
import { TravianPath } from '../../../_enums/TravianPath';

export const isResourceField = (fieldId: number): boolean => fieldId >= 1 && fieldId <= 18;
export const isInfrastructure = (fieldId: number): boolean => fieldId >= 19 && fieldId <= 40;

export const isFieldValid = (fieldId: number): boolean => isResourceField(fieldId) || isInfrastructure(fieldId);

export const startBuilding = async (): Promise<void> => {
  const { queue } = context.villages.village().buildings;
  const building = queue.popFirst();

  if (!building) {
    return;
  }

  const { account } = context.user;
  const {
    fieldId,
  } = building;

  if (!isFieldValid(fieldId)) {
    logException(`Tried to build at invalid field id: ${fieldId}`);
  }

  if (isResourceField(fieldId)) {
    await ensurePage(TravianPath.ResourceFieldsOverview)
  } else if (isInfrastructure(fieldId)) {
    await ensurePage(TravianPath.InfrastructureOverview)
  }

  log(`building at ${building.fieldId}`);
  const page = await getPage();
  await page.goto(`${account.server}/build.php?id=${fieldId}`);

  const submit = await page.$x(`//button[contains(@onclick, "${fieldId}")]`);
  await submit[0].click();
};

