import { getPage } from '../browser/getPage';
import { accountService } from '../services/accountService';

export const validateUrl = async (acceptedUrls: readonly string[], exact = false): Promise<void> => {
  const page = await getPage();
  const regExp = new RegExp(`^${accountService.getCurrentAccount().server}/`);

  const pageUrl = page.url().replace(regExp, '');
  const isValid = exact
    ? acceptedUrls.some(acceptedUrl => pageUrl === acceptedUrl)
    : acceptedUrls.some(acceptedUrl => pageUrl.startsWith(acceptedUrl));

  if (!isValid) {
    const urls = acceptedUrls.join(', ');
    throw new Error(`Invalid url. Expected one of: [ ${urls} ]. Received: ${pageUrl}`);
  }
};
