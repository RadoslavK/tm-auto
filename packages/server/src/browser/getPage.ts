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

const stealth = pluginStealth();
// TODO: workaround as typings changed in the original puppeteer or puppeteer extra but on this plugin
// https://github.com/berstend/puppeteer-extra/issues/211
// @ts-ignore
stealth.onBrowser = () => {};

puppeteer.use(stealth);

const chromeDriverArgs: ReadonlyArray<string> = [
  '--mute-audio',
  //  Performance improvements, when headless it uses too much CPU
  //  https://stackoverflow.com/a/58589026
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-accelerated-2d-canvas',
  '--no-first-run',
  '--no-zygote',
  '--single-process',
  '--disable-gpu',
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
    defaultViewport: null,
  };
};

let browser: Browser | null;
let page: Page | null;

export const createPage = async (): Promise<Page> => {
  if (!browser) {
    const options = getChromeOptions();
    //  TODO: puppeteer v5+ broke a lot of types so it might be fixed in future
    //https://github.com/puppeteer/puppeteer/issues/6979
    browser = await puppeteer.launch(options as any) as any as Browser;
  }

  const lPage = await browser.newPage();

  lPage.on('console', (consoleMessageObject) => {
    if (consoleMessageObject.type() !== 'warning') {
      console.debug(consoleMessageObject.text());
    }
  });

  await lPage.evaluateOnNewDocument(() => {
    // @ts-ignore
    // eslint-disable-next-line no-proto
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    // @ts-ignore
    // eslint-disable-next-line no-proto
    navigator.__proto__ = newProto;
  });

  return lPage;
};

export const getPage = async (): Promise<Page> => {
  if (!browser) {
    const options = getChromeOptions();
    browser = await puppeteer.launch(options as any) as any as Browser;
  }

  const pages = await browser.pages();

  page = pages.length ? pages[0] : await createPage();

  return page;
};

export const killBrowser = async (): Promise<void> => {
  if (browser) {
    await browser.close();
    browser = null;
  }
};
