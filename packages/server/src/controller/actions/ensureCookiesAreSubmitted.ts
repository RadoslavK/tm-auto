import { browserManager } from '../../browser/browserManager.js';

export const ensureCookiesAreSubmitted = async (): Promise<void> => {
  const page = await browserManager.getPage();

  const acceptBtn = await page.$('[onclick*="setConsentViaBtn(1)"]');

  if (!acceptBtn) {
    return;
  }

  await Promise.all([
    page.waitForSelector('[onclick*="setConsentViaBtn(1)"]', { hidden: true }),
    acceptBtn.click(),
  ]);
};