import path from 'path';

import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';

import { getGeneralSettingsService } from '../services/settings/general';
import { getServerAppDirectory } from '../utils/getServerAppDirectory';

const stealth = pluginStealth();
// TODO: workaround as typings changed in the original puppeteer or puppeteer extra but on this plugin
// https://github.com/berstend/puppeteer-extra/issues/211
// @ts-ignore
stealth.onBrowser = () => {};

puppeteer.use(stealth);

const getChromeOptions = () => ({
  executablePath: getGeneralSettingsService().get().chromePath,
  //  TODO: If it is not headless and we are using real Chrome app it probably interferes with the puppeteer/
  //  https://stackoverflow.com/questions/62149934/navigation-timeout-exceeded-when-headless-false
  headless: getGeneralSettingsService().get().headlessChrome,
  slowMo: 25,
  userDataDir: path.join(getServerAppDirectory(), 'browser_data'),
});

let browser: Browser | null;
let page: Page | null;

export const createPage = async (): Promise<Page> => {
  if (!browser) {
    browser = await puppeteer.launch(getChromeOptions());
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
    browser = await puppeteer.launch(getChromeOptions());
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
