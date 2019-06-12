import { getPage } from '../../browser/getPage';

export const parseServerSpeed = async (): Promise<number> => {
  const page = await getPage();
  const content = await page.content();
  const match = /Travian\.Game\.speed = (\d+);/.exec(content);
  return +match[1];
};
