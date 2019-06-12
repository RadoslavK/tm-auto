import { TravianPath } from '../../_enums/TravianPath';
import { getPage } from '../../browser/getPage';
import { context } from '../../graphql/context';

export const ensureLoggedIn = async (): Promise<void> => {
  const { account } = context.user;

  const page = await getPage();
  await page.goto(`${account.server}/${TravianPath.ResourceFieldsOverview}`);

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
