import path from 'path';
import type {
  Browser,
  BrowserConnectOptions,
  BrowserLaunchArgumentOptions,
  LaunchOptions,
  Page,
} from 'puppeteer-core';
import puppeteer from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';

import { accountService } from '../services/accountService.js';
import { GeneralSettingsService } from '../services/settings/general.js';
import { getServerAppDirectory } from '../utils/getServerAppDirectory.js';

puppeteer.use(pluginStealth());

const chromeDriverArgs: ReadonlyArray<string> = [
  '--mute-audio',
  //  Performance improvements, when headless it uses too much CPU
  //  https://stackoverflow.com/a/58589026
  '--disable-2d-canvas-clip-aa', // Disable antialiasing on 2d canvas clips
  '--disable-accelerated-2d-canvas',
  '--disable-breakpad',
  '--disable-canvas-aa', // Disable antialiasing on 2d canvas
  '--disable-dev-shm-usage',
  '--disable-gl-drawing-for-tests', // Disables GL drawing operations which produce pixel output. With this the GL output will not be correct but tests will run faster.
  '--disable-gpu',
  '--disable-infobars',
  '--disable-setuid-sandbox',
  '--enable-webgl',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-sandbox',
  '--no-zygote',
  '--single-process',
  '--use-gl=swiftshader', // better cpu usage with --use-gl=desktop rather than --use-gl=swiftshader
];

const isDevelopment = process.env.NODE_ENV !== 'production';

const getChromeOptions = (): LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions => {
  const headless = GeneralSettingsService.getService().get().headlessChrome;
  const accountId = accountService.getCurrentAccount().id;

  if (!process.env.appPath) {
    throw new Error('Undefined app path');
  }

  const executablePath = isDevelopment
    ? process.env.chromiumPath
    : path.join(process.env.appPath.replace('app.asar', 'app.asar.unpacked'), 'Chrome-bin/chrome.exe');

  return {
    executablePath,
    headless,
    slowMo: 25,
    userDataDir: path.join(getServerAppDirectory(), 'browser_data', accountId),
    args: [...chromeDriverArgs, ...(headless ? [] : ['--start-maximized'])],
    //  Disable the default 800x600 viewport
    defaultViewport: isDevelopment ? null : undefined,
    devtools: isDevelopment,
  };
};

class BrowserManager {
  private browser: Browser | null = null;
  private page: Page | null = null;

  private getBrowser = async (): Promise<Browser> => {
    if (!this.browser) {
      const options = getChromeOptions();
      //  TODO: puppeteer v5+ broke a lot of types so it might be fixed in future
      //https://github.com/puppeteer/puppeteer/issues/6979
      this.browser = await puppeteer.launch(options as any) as any as Browser;
    }

    return this.browser;
  };

  public getNewPage = async (): Promise<Page> => {
    const browser = await this.getBrowser();

    return browser.newPage();
  };

  public getPage = async (): Promise<Page> => {
    if (this.page) {
      return this.page;
    }

    const browser = await this.getBrowser();
    const pages = await browser.pages();

    let page: Page;

    if (pages.length) {
      page = pages[0];
    } else {
      page = await this.getNewPage();
    }

    this.page = page;

    return page;
  };

  public kill = async (): Promise<void> => {
    if (this.page) {
      await this.page.close();

      this.page = null;
    }

    if (this.browser) {
      await this.browser.close();

      this.browser = null;
    }
  };
}

export const browserManager = new BrowserManager();