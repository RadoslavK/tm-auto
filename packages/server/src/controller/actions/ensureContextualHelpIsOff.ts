import { TravianPath } from '../../_enums/travianPath.js';
import { getPage } from '../../browser/getPage.js';
import { ensurePage } from './ensurePage.js';

export const ensureContextualHelpIsOff = async (): Promise<void> => {
  const page = await getPage();

  await ensurePage(TravianPath.Settings);

  const input = await page.$('#contextual_help input');

  if (!input) {
    throw new Error('Did not find contextual help checkbox');
  }

  const checkProp = await (await input.getProperty('checked')).jsonValue();

  if (checkProp === true || checkProp === 'checked') {
    return;
  }

  await input.click();

  const submit = await page.$('button[type=submit]');

  if (!submit) {
    throw new Error('Did not find submit button');
  }

  await Promise.all([
    submit.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);
};
