import { browserManager } from '../../browser/browserManager.js';

export const parseHasHeroLevelUp = async (): Promise<boolean> => {
  const page = await browserManager.getPage();

  return !!(await page.$('#topBarHero .levelUp.show'));
};
