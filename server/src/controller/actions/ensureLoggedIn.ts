import { Page } from 'puppeteer';
import { TravianPath } from '../../_enums/TravianPath';
import { context } from '../../graphql/context';

export const ensureLoggedIn = async (page: Page): Promise<void> => {
  const { userAccount } = context.userService;
  await page.goto(`${userAccount.server}/${TravianPath.ResourceFieldsOverview}`);

  const loginForm = await page.$('form[name=login');

  if (!loginForm) {
    return;
  }

  await page.waitForSelector('form[name=login] button[type=submit]');

  await page.type('form[name=login] input[name=name]', userAccount.username);
  await page.type('form[name=login] input[name=password]', userAccount.password);
  await page.click('form[name=login] button[type=submit]');

  console.log('Logged in.');
};
