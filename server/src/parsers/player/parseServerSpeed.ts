import { Page } from 'puppeteer';

export const parseServerSpeed = async (page: Page): Promise<number> => {
  const content = await page.content();
  const match = /Travian\.Game\.speed = (\d+);/.exec(content);
  return +match[1];
};
