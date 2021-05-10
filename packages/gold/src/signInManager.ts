import fs from 'fs';
import ini from 'ini';
import path from 'path';
import { TravianPath } from 'server/_enums/travianPath.js';
import { ensurePage } from 'server/controller/actions/ensurePage.js';
import { replaceInputTextBySelector } from 'server/utils/browser/replaceInputText.js';

import { browserManager } from './browserManager.js';

type Config = {
  readonly username: string;
  readonly password: string;
  readonly server: string;
};

class SignInManager {
  public signIn = async (): Promise<void> => {
    const configPath = path.join(__dirname, './config.ini');
    const config = ini.parse<Config>(fs.readFileSync(configPath, 'utf-8'));

    const page = await browserManager.getPage();

    await page.goto(`${config.server}/${TravianPath.ResourceFieldsOverview}`);

    const acceptBtn = await page.$('[onclick*="setConsentViaBtn(1)"]');

    //  Ensure cookies submitting
    if (acceptBtn) {
      await Promise.all([
        page.waitForSelector('[onclick*="setConsentViaBtn(1)"]', { hidden: true }),
        acceptBtn.click(),
      ]);
    }

    const loginForm = await page.$('form[name=login]');

    if (loginForm) {
      await page.waitForSelector('form[name=login] button[type=submit]');

      await replaceInputTextBySelector(
        page as any,
        'form[name=login] input[name=name]',
        config.username,
      );
      await replaceInputTextBySelector(
        page as any,
        'form[name=login] input[name=password]',
        config.password,
      );

      const acceptCookies = await page.$('#cmpbntyestxt');
      acceptCookies?.click();

      await Promise.all([
        page.waitForSelector('form[name=login] button[type=submit]', { hidden: true }),
        page.click('form[name=login] button[type=submit]'),
      ]);
    } else {
      // is signed in as different config?
      const signedInPlayer = await page.$eval(
        '.playerName',
        (e) => (e as HTMLElement).innerText,
      );

      if (signedInPlayer === config.username) {
        await ensurePage(TravianPath.ResourceFieldsOverview, false, page as any);
      } else {
        await ensurePage(TravianPath.Logout, false, page as any);
        await this.signIn();
      }
    }
  };
}

export const signInManager = new SignInManager();