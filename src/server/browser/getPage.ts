import {
  Browser,
  Page,
} from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';

const stealth = pluginStealth();
// TODO: workaround as typings changed in the original puppeteer or puppeteer extra but on this plugin
// https://github.com/berstend/puppeteer-extra/issues/211
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
stealth.onBrowser = () => {};

puppeteer.use(stealth);

const chromeOptions = {
  executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  //  TODO: If it is not headless and we are using real Chrome app it probably interferes with the puppeteer/
  //  https://stackoverflow.com/questions/62149934/navigation-timeout-exceeded-when-headless-false
  headless: true,
  slowMo: 25,
  userDataDir: './.data/browser_data',
};

let browser: Browser | null;
let page: Page | null;

const initializePage = async (b: Browser): Promise<Page> => {
  const lPage = await b.newPage();

  lPage.on('console', consoleMessageObject => {
    if (consoleMessageObject.type() !== 'warning') {
      console.debug(consoleMessageObject.text());
    }
  });

  await lPage.evaluateOnNewDocument(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-proto
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-proto
    navigator.__proto__ = newProto;
  });

  return lPage;
};

export const getPage = async (): Promise<Page> => {
  if (!browser) {
    browser = await puppeteer.launch(chromeOptions);
  }

  const pages = await browser.pages();

  page = pages.length
    ? pages[0]
    : await initializePage(browser);

  return page;
};

export const killBrowser = async (): Promise<void> => {
  if (browser) {
    await browser.close();
    browser = null;
  }
};
