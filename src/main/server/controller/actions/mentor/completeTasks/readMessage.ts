import { TravianPath } from '../../../../_enums/travianPath';
import { getPage } from '../../../../browser/getPage';
import { ensurePage } from '../../ensurePage';

export const readMessage = async (): Promise<void> => {
  await ensurePage(TravianPath.Messages);

  const page = await getPage();

  const messageRows = await page.$$('#overview tbody tr');

  let success = false;

  for (const messageRow of messageRows) {
    const unreadStatus = await messageRow.$('[href$="toggleState=read"]');

    if (unreadStatus) {
      const link = await page.evaluateHandle(
        (el: Element) => el.nextElementSibling,
        unreadStatus,
      );
      const linkElement = link.asElement();

      if (!linkElement) {
        throw new Error('Failed to retrieve link');
      }

      await linkElement.click();
      await page.waitForSelector('#message');
      success = true;
      break;
    }
  }

  if (!success) {
    throw new Error('Failed to read message');
  }
};
