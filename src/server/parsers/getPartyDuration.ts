import { getPage } from '../browser/getPage';
import { Duration } from '../_models/duration';

//  TODO validate page

export const getPartyDuration = async (): Promise<Duration | null> => {
  const page = await getPage();
  const duration = await page.$eval('[class="dur"] > span', x => x.getAttribute('value'));

  return duration ? Duration.fromSeconds(+duration) : null;
};
