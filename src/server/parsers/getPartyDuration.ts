import { getPage } from '../browser/getPage';

export const getPartyDuration = async (): Promise<number | null> => {
  const page = await getPage();
  const duration = await page.$eval('[class="dur"] > span', x => x.getAttribute('value'));

  return duration ? +duration : null;
};