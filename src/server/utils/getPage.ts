import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';

puppeteer.use(pluginStealth());

const chromeOptions = {
  headless: false,
  executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  slowMo: 25,
  userDataDir: './user_data',
};

let browser: Browser;
let page: Page;

export const getPage = async (): Promise<Page> => {
  if (!browser) {
    browser = await puppeteer.launch(chromeOptions);
  }

  if (!page) {
    page = await browser.newPage();
  }

  page.on('console', consoleMessageObject => {
    if (consoleMessageObject.type() !== 'warning') {
      console.debug(consoleMessageObject.text());
    }
  });

  await page.evaluateOnNewDocument(() => {
    // @ts-ignore
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    // @ts-ignore
    navigator.__proto__ = newProto;
  });

  return page;
};

export const killBrowser = async (): Promise<void> => {
  if (!!browser) {
    await browser.close();
  }
};
