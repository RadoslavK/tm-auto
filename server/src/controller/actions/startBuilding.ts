import { logException } from '../../../../_shared/utils/invariantException';
import { context } from '../../graphql/context';
import { ensureUrl } from './ensureUrl';
import { TravianPath } from '../../_enums/TravianPath';
import { getPage } from '../browser/getPage';

interface IStartBuildingParams {
  readonly fieldId: number;
}

export const isResourceField = (fieldId: number): boolean => fieldId >= 1 && fieldId <= 18;
export const isBuildingField = (fieldId: number): boolean => fieldId >= 19 && fieldId <= 40;

const isValidField = (fieldId: number): boolean => isResourceField(fieldId) || isBuildingField(fieldId);

export const startBuilding = async (params: IStartBuildingParams) => {
  const {
    fieldId,
  } = params;

  const page = await getPage();
  const { userAccount } = context.userService;

  if (!isValidField(fieldId)) {
    logException(`Tried to build at invalid field id: ${fieldId}`);
  }

  if (isResourceField(fieldId)) {
    await ensureUrl(TravianPath.ResourceFieldsOverview)
  } else if (isBuildingField(fieldId)) {
    await ensureUrl(TravianPath.BuildingsOverview)
  }

  await page.goto(`${userAccount.server}/build.php?id=${fieldId}`);

  const submit = await page.$x(`//button[contains(@onclick, "${fieldId}")]`);
  await submit[0].click();
};

