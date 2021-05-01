import type { Page } from 'puppeteer';

import { TravianPath } from '../../_enums/travianPath.js';
import { getPage } from '../../browser/getPage.js';
import { accountService } from '../../services/accountService.js';
import { activityService } from '../../services/botActivityService.js';
import { replaceInputTextBySelector } from '../../utils/browser/replaceInputText.js';
import { ensurePage } from './ensurePage.js';



export const ensureLoggedIn = async (existingPage?: Page): Promise<void> => {
  activityService.setActivity('Logging in');

  const account = accountService.getCurrentAccount();
  const page = existingPage || (await getPage());

  await page.goto(`${account.server}/${TravianPath.ResourceFieldsOverview}`);

  const loginForm = await page.$('form[name=login]');

  if (loginForm) {
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

    await Promise.all([
      page.waitForSelector('form[name=login] button[type=submit]', { hidden: true }),
      page.click('form[name=login] button[type=submit]'),
    ]);
  } else {
    // is signed in as different account?
    const signedInPlayer = await page.$eval(
      '.playerName',
      (e) => (e as HTMLElement).innerText,
    );

    if (signedInPlayer === account.username) {
      await ensurePage(TravianPath.ResourceFieldsOverview);
    } else {
      await ensurePage(TravianPath.Logout);
      await ensureLoggedIn(page);
    }
  }

  activityService.setActivity('Logged in');
};
