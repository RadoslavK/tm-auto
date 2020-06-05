import { Duration } from '../_models/duration';
import { getPage } from '../browser/getPage';

export const getPartyDuration = async (): Promise<Duration | null> => {
  const page = await getPage();

  const durationNode = await page.$('.dur > span');

  if (!durationNode) {
    return null;
  }

  const duration = await page.evaluate((x: Element) => x.getAttribute('value'), durationNode);

  if (!duration) {
    throw new Error('Did not find duration value');
  }

  return Duration.fromSeconds(+duration);
};
