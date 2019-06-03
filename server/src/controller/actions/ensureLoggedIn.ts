import { account } from '../../index';
import { TravianPath } from '../../_enums/TravianPath';
import { getPage } from '../browser/getPage';

export const ensureLoggedIn = async () => {
  const page = await getPage();
  await page.goto(`${account.url}/${TravianPath.ResourceFieldsOverview}`);

  const loginForm = await page.$('form[name=login');

  if (!loginForm) {
    return;
  }

  await page.waitForSelector('form[name=login] button[type=submit]');

  await page.type('form[name=login] input[name=name]', account.username);
  await page.type('form[name=login] input[name=password]', account.password);
  await page.click('form[name=login] button[type=submit]');

  console.log('Logged in.');
};
