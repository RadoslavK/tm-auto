import { Page } from 'puppeteer';
import { logException } from '../../../_shared/utils/invariantException';
import { context } from '../graphql/context';

export const validateUrl = (page: Page, acceptedUrls: readonly string[]) => {
  const regExp = new RegExp(`^${context.userService.userAccount.server}/`);

  const pageUrl = page.url().replace(regExp, '');
  const isValid = acceptedUrls.some(acceptedUrl => {
    return pageUrl.startsWith(acceptedUrl);
  });

  if (!isValid) {
    const urls = acceptedUrls.join(', ');
    logException(`Invalid url. Excepted one of: [ ${urls} ]. Received: ${pageUrl}`);
  }
};
