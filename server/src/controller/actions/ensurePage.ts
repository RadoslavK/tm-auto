import { getPage } from '../../browser/getPage';

export const ensurePage = async (path: string, exact: boolean = false): Promise<void> => {
  const page = await getPage();
  const url = page.url();

  const isAtUrl = (exact && url === path)
    || (!exact && url.includes(path));

  if (isAtUrl) {
    return;
  }

  const link = await page.$(`[href*="${path}"]`);
  await Promise.all([
    link.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);
};
