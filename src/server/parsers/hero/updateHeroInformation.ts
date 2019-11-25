import { getPage } from '../../browser/getPage';
import { accountContext } from '../../accountContext';
import { publishPayloadEvent } from '../../graphql/subscriptions/pubSub';
import { BotEvent } from '../../graphql/subscriptions/botEvent';
import { IHeroState } from '../../_types/graphql';

export const updateHeroInformation = async (): Promise<void> => {
  const page = await getPage();
  const { hero } = accountContext;

  hero.villageId = await page.$eval('.heroStatusMessage > a', x => {
    const heroVillageLink = x.getAttribute('href');

    if (!heroVillageLink) {
      throw new Error('Failed to parse current hero village');
    }

    const villageIdMatch = /newdid=(\d+)/.exec(heroVillageLink);

    if (!villageIdMatch) {
      throw new Error('Failed to parse current hero village');
    }

    return +villageIdMatch[1];
  });

  hero.health = await page.$eval('[class*=heroHealthBar] > *:last-child', x => {
    const style = x.getAttribute('style');

    if (!style) {
      throw new Error('Did not find hero health bar style');
    }

    const match = /width:(.*?)%/.exec(style);

    if (!match) {
      throw new Error('Failed to parse hero health');
    }

    return +match[1];
  });

  const heroStatusClass = await page.$eval('img[class*=heroStatus]', x => x.className);
  const heroStatusMatch = /heroStatus(\d+)/.exec(heroStatusClass);

  if (!heroStatusMatch) {
    throw new Error('Failed to parse hero status');
  }

  const status = +heroStatusMatch[1];

  switch(status) {
    case 100:
      hero.state = IHeroState.InVillage;
      break;

    case 101: {
      hero.state = heroStatusClass.includes('Regenerate') ? IHeroState.Reviving : IHeroState.Dead;
      break;
    }

    case 50:
      hero.state = IHeroState.OnAdventure;
      break;

    default:
      hero.state = IHeroState.Unknown;
  }

  const pageContent = await page.content();
  const adventureCountMatch = /"boxId":"hero",.*?,"speechBubble":"(\d+)"/.exec(pageContent);

  if (!adventureCountMatch) {
    throw new Error('Failed to parse adventure count');
  }

  const adventureCount = +adventureCountMatch[1];
  hero.hasAvailableAdventures = adventureCount > 0;

  publishPayloadEvent(BotEvent.HeroInformationUpdated, { heroInformation: hero });
};