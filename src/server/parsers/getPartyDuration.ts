import { Duration } from '../_models/duration';
import { getPage } from '../browser/getPage';

export const getPartyDuration = async (): Promise<Duration | null> => {
  const page = await getPage();
  const duration = await page.$eval('[class="dur"] > span', x => x.getAttribute('value'));

  return duration ? Duration.fromSeconds(+duration) : null;
};
