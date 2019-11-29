import { HeroState } from '../../_types/graphql';
import { accountContext } from '../../accountContext';
import { getPage } from '../../browser/getPage';
import { BotEvent } from '../../graphql/subscriptions/botEvent';
import { publishPayloadEvent } from '../../graphql/subscriptions/pubSub';

export const updateHeroInformation = async (): Promise<void> => {
  const page = await getPage();
  const { hero } = accountContext;

  const heroStatusMessage = await page.$('.heroStatusMessage > a');

  if (heroStatusMessage) {
    // Dead hero does not have status message, so no village can be recognized
    hero.villageId = await heroStatusMessage.evaluate(x => {
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
  } else {
    hero.villageId = null;
  }

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
      hero.state = HeroState.Unknown;
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
