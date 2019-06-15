import { HeroState } from '../../_models/hero/hero';
import { getPage } from '../../browser/getPage';
import { context } from '../../graphql/context';

export const updateHeroInformation = async () => {
  const page = await getPage();
  const hero = context.hero;

  hero.health = await page.$eval('[class*=heroHealthBar] > *:last-child', x => {
    const style = x.getAttribute('style');
    return +/width:(.*?)%/.exec(style)[1]
  });

  const heroStatusClass = await page.$eval('img[class*=heroStatus]', x => x.className);
  const status = +/heroStatus(\d+)/.exec(heroStatusClass)[1];

  switch(status) {
    case 100:
      hero.state = HeroState.InVillage;
      break;

    case 101: {
      hero.state = heroStatusClass.includes('Regenerate') ? HeroState.Reviving : HeroState.Dead;
      break;
    }

    case 50:
      hero.state = HeroState.OnAdventure;
      break;

    default:
      hero.state = HeroState.None;
  }

  const pageContent = await page.content();
  const adventureCount = +/"boxId":"hero",.*?,"speechBubble":"(\d+)"/.exec(pageContent)[1];
  hero.hasAvailableAdventures = adventureCount > 0;
};
