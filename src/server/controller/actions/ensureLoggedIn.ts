import { TravianPath } from '../../_enums/travianPath';
import { getAccountContext } from '../../accountContext';
import { getPage } from '../../browser/getPage';
import { accountService } from '../../services/accountService';
import { ensurePage } from './ensurePage';

export const ensureLoggedIn = async (): Promise<void> => {
  const account = accountService.getCurrentAccount();

  const page = await getPage();

  if (page.url().includes(account.server)) {
    await ensurePage(TravianPath.ResourceFieldsOverview);
  } else {
    await page.goto(`${account.server}/${TravianPath.ResourceFieldsOverview}`);
  }

  const loginForm = await page.$('form[name=login]');

  if (!loginForm) {
    return;
  }

  getAccountContext().logsService.logText(`Logging in as ${account.username}`);

  await page.waitForSelector('form[name=login] button[type=submit]');

  await page.type('form[name=login] input[name=name]', account.username);
  await page.type('form[name=login] input[name=password]', account.password);
  await page.click('form[name=login] button[type=submit]');

  getAccountContext().logsService.logText('Logged in.');

  const loginFormAfterLogIn = await page.$('form[name=login]');

  if (loginFormAfterLogIn) {
    throw new Error('Found login form after login');
  }
};
