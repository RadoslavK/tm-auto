import { getPage } from '../../browser/getPage';

export const parseHasHeroLevelUp = async (): Promise<boolean> => {
  const page = await getPage();

  return !!(await page.$('#topBarHero .levelUp'));
};
