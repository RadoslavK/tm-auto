import { context } from '../../graphql/context';
import { getPage } from '../../browser/getPage';

export const ensureUrl = async (path: string, exact = false): Promise<void> => {
  const page = await getPage();
  const { userAccount } = context.userService;
  const url = `${userAccount.server}/${path}`;

  const isAtUrl = (exact && page.url() === url)
    || (!exact && page.url().includes(url));

  if (!isAtUrl) {
    await page.goto(url);
  }
};
