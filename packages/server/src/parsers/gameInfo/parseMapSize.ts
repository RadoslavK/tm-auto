import { browserManager } from '../../browser/browserManager.js';

export const parseMapSize = async (): Promise<number> => {
  const page = await browserManager.getPage();

  return await page.evaluate(
    () => (window as any).TravianDefaults.Map.Size.right,
  );
};
