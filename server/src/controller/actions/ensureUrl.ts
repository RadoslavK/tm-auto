import { account } from '../../index';
import { getPage } from '../browser/getPage';

export const ensureUrl = async (path: string, exact = false) => {
  const page = await getPage();
  const url = `${account.url}/${path}`;

  const isAtUrl = (exact && page.url() === url)
    || (!exact && page.url().includes(url));

  if (!isAtUrl) {
    await page.goto(url);
  }
};
