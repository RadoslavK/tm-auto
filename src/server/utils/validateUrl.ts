import { getPage } from '../browser/getPage';
import { accountService } from '../services/accountService';

export const validateUrl = async (acceptedUrls: readonly string[]): Promise<void> => {
  const page = await getPage();
  const regExp = new RegExp(`^${accountService.getCurrentAccount().server}/`);

  const pageUrl = page.url().replace(regExp, '');
  const isValid = acceptedUrls.some(acceptedUrl => {
    return pageUrl.startsWith(acceptedUrl);
  });

  if (!isValid) {
    const urls = acceptedUrls.join(', ');
    throw new Error(`Invalid url. Expected one of: [ ${urls} ]. Received: ${pageUrl}`);
  }
};
