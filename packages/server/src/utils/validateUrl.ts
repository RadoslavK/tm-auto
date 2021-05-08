import type { Page } from 'puppeteer-core';

import { browserManager } from '../browser/browserManager.js';
import { accountService } from '../services/accountService.js';

export const validateUrl = async (
  acceptedUrls: readonly string[],
  exact = false,
  existingPage?: Page,
): Promise<void> => {
  const page = existingPage || (await browserManager.getPage());
  const regExp = new RegExp(`^${accountService.getCurrentAccount().server}/`);

  const pageUrl = page.url().replace(regExp, '');
  const isValid = exact
    ? acceptedUrls.some(
      (acceptedUrl) =>
        pageUrl === acceptedUrl || pageUrl.startsWith(`${acceptedUrl}?`),
    )
    : acceptedUrls.some((acceptedUrl) => pageUrl.startsWith(acceptedUrl));

  if (!isValid) {
    const urls = acceptedUrls.join(', ');
    throw new Error(
      `Invalid url. Expected one of: [ ${urls} ]. Received: ${pageUrl}`,
    );
  }
};
