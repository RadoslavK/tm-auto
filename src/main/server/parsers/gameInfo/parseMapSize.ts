import { getPage } from '../../browser/getPage.js';

export const parseMapSize = async (): Promise<number> => {
  const page = await getPage();

  return await page.evaluate(
    () => (window as any).TravianDefaults.Map.Size.right,
  );
};
