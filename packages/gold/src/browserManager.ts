import path from 'path';
import type {
  Browser,
  Page,
} from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { ensurePage } from 'server/controller/actions/ensurePage.js';

puppeteer.use(stealthPlugin());

const isDevelopment = process.env.NODE_ENV !== 'production';

class BrowserManager {
  private browser: Browser | null = null;
  private page: Page | null = null;

  private initBrowser = async (): Promise<Browser> => {
    if (this.browser) {
      return this.browser;
    }

    const browser = await puppeteer.launch({
      defaultViewport: null,
      executablePath: isDevelopment
        ? path.join(__dirname, '../../../app/Chrome-bin/chrome.exe')
        : path.join(__dirname, 'chrome-win/chrome.exe'),
      // headless: true,
      headless: false,
      slowMo: 25,
      userDataDir: path.join(__dirname, 'browser_data'),
      args: [
        '--mute-audio',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
      ],
    });

    this.browser = browser;

    return browser;
  };

  public getPage = async (): Promise<Page> => {
    if (this.page) {
      return this.page;
    }

    const browser = await this.initBrowser();
    const pages = await browser.pages();
    let page: Page;

    if (pages.length) {
      page = pages[0];
    } else {
      page = await browser.newPage();
    }

    this.page = page;

    return page;
  };

  public ensurePage = async (path: string, exact = false): Promise<void> => {
    const page = await this.getPage();

    await ensurePage(path, exact, page as any);
  };
}

export const browserManager = new BrowserManager();