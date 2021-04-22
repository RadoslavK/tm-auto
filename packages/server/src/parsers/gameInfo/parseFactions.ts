import { getPage } from '../../browser/getPage.js';

export const parseFactions = async (): Promise<boolean> => {
  const page = await getPage();
  const text = await page.content();
  const factions = /"factions":(.*?),/.exec(text)?.[1];

  if (!factions) {
    throw new Error('Failed to parse factions');
  }

  return factions === 'true';
};