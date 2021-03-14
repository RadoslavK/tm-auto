import { TravianPath } from '../../_enums/travianPath';
import { getPage } from '../../browser/getPage';
import { validateUrl } from '../../utils/validateUrl';

const acceptedUrls = [TravianPath.PlayerProfile];

export const parseAllyId = async (): Promise<number | null> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();

  const allyLinkElement = await page.$('[href*="allianz.php?aid="]');

  if (!allyLinkElement) {
    return null;
  }

  const allyLink = await allyLinkElement.evaluate((x) =>
    x.getAttribute('href'),
  );

  if (!allyLink) {
    throw new Error('Failed to parse alliance id');
  }

  const match = /aid=(\d+)/.exec(allyLink);

  if (!match) {
    throw new Error('Failed to parse alliance id');
  }

  return +match[1];
};
