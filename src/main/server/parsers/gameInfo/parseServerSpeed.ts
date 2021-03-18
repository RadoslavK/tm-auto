import { getPage } from '../../browser/getPage.js';

export const parseServerSpeed = async (): Promise<number> => {
  const page = await getPage();
  const content = await page.content();
  const match = /Travian\.Game\.speed = (\d+);/.exec(content);

  if (!match) {
    throw new Error('Failed to parse server speed');
  }

  return +match[1];
};
