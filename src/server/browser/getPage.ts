import { Browser, Page } from 'puppeteer';
// @ts-ignore
import puppeteer from 'puppeteer-extra';
// @ts-ignore
import pluginStealth from 'puppeteer-extra-plugin-stealth';

puppeteer.use(pluginStealth());

const chromeOptions = {
  headless: false,
  executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  slowMo: 25,
  userDataDir: './.data/browser_data',
};

let browser: Browser | null;
let page: Page | null;

export const getPage = async (): Promise<Page> => {
  if (!browser) {
    browser = await puppeteer.launch(chromeOptions);
  }

  if (!page) {
    page = await browser!.newPage();

    page.on('console', consoleMessageObject => {
      if (consoleMessageObject.type() !== 'warning') {
        console.debug(consoleMessageObject.text());
      }
    });

    await page.evaluateOnNewDocument(() => {
      // @ts-ignore
      // eslint-disable-next-line no-proto
      const newProto = navigator.__proto__;
      delete newProto.webdriver;
      // @ts-ignore
      // eslint-disable-next-line no-proto
      navigator.__proto__ = newProto;
    });
  }

  return page;
};

export const killBrowser = async (): Promise<void> => {
  if (page) {
    await page.close();
    page = null;
  }

  if (browser) {
    await browser.close();
    browser = null;
  }
};
