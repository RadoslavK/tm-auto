import { logException } from '../../../_shared/utils/logException';
import { getPage } from '../browser/getPage';
import { accountService } from '../services/accountService';

export const validateUrl = async (acceptedUrls: readonly string[]): Promise<void> => {
  const page = await getPage();
  const regExp = new RegExp(`^${accountService.getAccount().server}/`);

  const pageUrl = page.url().replace(regExp, '');
  const isValid = acceptedUrls.some(acceptedUrl => {
    return pageUrl.startsWith(acceptedUrl);
  });

  if (!isValid) {
    const urls = acceptedUrls.join(', ');
    logException(`Invalid url. Excepted one of: [ ${urls} ]. Received: ${pageUrl}`);
  }
};
