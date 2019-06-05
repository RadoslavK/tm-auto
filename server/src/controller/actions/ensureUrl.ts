import { userService } from '../../services/userService';
import { getPage } from '../browser/getPage';

export const ensureUrl = async (path: string, exact = false) => {
  const page = await getPage();
  const account = userService.getAccount();
  const url = `${account.server}/${path}`;

  const isAtUrl = (exact && page.url() === url)
    || (!exact && page.url().includes(url));

  if (!isAtUrl) {
    await page.goto(url);
  }
};
