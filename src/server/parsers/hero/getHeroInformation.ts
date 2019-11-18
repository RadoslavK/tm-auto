import { HeroState } from '../../_models/hero/hero';
import { getPage } from '../../browser/getPage';
import { heroService } from '../../services/heroService';
import { logException } from '../../../../_shared/utils/logException';

export const updateHeroInformation = async (): Promise<void> => {
  const page = await getPage();
  const hero = heroService.get();

  hero.health = await page.$eval('[class*=heroHealthBar] > *:last-child', x => {
    const style = x.getAttribute('style');

    if (!style) {
      throw logException('Did not find hero health bar style');
    }

    const match = /width:(.*?)%/.exec(style);

    if (!match) {
      throw logException('Failed to parse hero health');
    }

    return +match[1]
  });

  const heroStatusClass = await page.$eval('img[class*=heroStatus]', x => x.className);
  const heroStatusMatch = /heroStatus(\d+)/.exec(heroStatusClass);

  if (!heroStatusMatch) {
    throw logException('Failed to parse hero status');
  }

  const status = +heroStatusMatch[1];

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
  const adventureCountMatch = /"boxId":"hero",.*?,"speechBubble":"(\d+)"/.exec(pageContent);

  if (!adventureCountMatch) {
    throw logException('Failed to parse adventure count');
  }

  const adventureCount = +adventureCountMatch[1];
  hero.hasAvailableAdventures = adventureCount > 0;
};
