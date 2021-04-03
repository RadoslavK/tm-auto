import type { Page } from 'puppeteer';

import { TravianPath } from '../../_enums/travianPath.js';
import {
  AccountContext,
} from '../../accountContext.js';
import { getPage } from '../../browser/getPage.js';
import { accountService } from '../../services/accountService.js';
import { replaceInputTextBySelector } from '../../utils/browser/replaceInputText.js';
import { ensurePage } from './ensurePage.js';

export const ensureLoggedIn = async (existingPage?: Page): Promise<void> => {
  const account = accountService.getCurrentAccount();

  const page = existingPage || (await getPage());

  if (page.url().includes(account.server)) {
    // is signed in as different account?
    const signedInPlayer = await page.$eval(
      '.playerName',
      (e) => (e as HTMLElement).innerText,
    );

    if (signedInPlayer === account.username) {
      await ensurePage(TravianPath.ResourceFieldsOverview);
    } else {
      await ensurePage(TravianPath.Logout);
    }
  } else {
    await page.goto(`${account.server}/${TravianPath.ResourceFieldsOverview}`);
  }

  const loginForm = await page.$('form[name=login]');

  if (!loginForm) {
    return;
  }

  AccountContext.getContext().logsService.logText(`Logging in as ${account.username}`);

  await page.waitForSelector('form[name=login] button[type=submit]');

  await replaceInputTextBySelector(
    page,
    'form[name=login] input[name=name]',
    account.username,
  );
  await replaceInputTextBySelector(
    page,
    'form[name=login] input[name=password]',
    account.password,
  );

  const acceptCookies = await page.$('#cmpbntyestxt');
  acceptCookies?.click();

  //  TODO verify successful login action
  await page.click('form[name=login] button[type=submit]');

  AccountContext.getContext().logsService.logText('Logged in.');

  const loginFormAfterLogIn = await page.$('form[name=login]');

  if (loginFormAfterLogIn) {
    throw new Error('Found login form after login');
  }
};
