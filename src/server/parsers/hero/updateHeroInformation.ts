import { HeroState } from '../../../_shared/types/heroState';
import { getAccountContext } from '../../accountContext';
import { getPage } from '../../browser/getPage';
import { BotEvent } from '../../events/botEvent';
import { publishEvent } from '../../pubSub';
import { gameInfoService } from '../../services/info/gameInfoService';

const parseHealth = async (): Promise<number> => {
  const page = await getPage();

  return page.$eval('[class*=heroHealthBar] > *:last-child', x => {
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
};

const parseHealthNew = async (): Promise<number> => {
  const page = await getPage();

  const healthTooltip = await page.$eval('#topBarHero .health .title', (x: any) => x._travianTooltip.text);

  const match = /(\d+)/.exec(healthTooltip);

  if (!match) {
    throw new Error('Failed to parse hero health');
  }

  return +match[1];
};

const parseState = async (): Promise<HeroState> => {
  const page = await getPage();
  const heroStatusClass = await page.$eval('img[class*=heroStatus]', x => x.className);
  const heroStatusMatch = /heroStatus(\d+)/.exec(heroStatusClass);

  if (!heroStatusMatch) {
    throw new Error('Failed to parse hero status');
  }

  const status = +heroStatusMatch[1];

  switch (status) {
    case 100: return HeroState.InVillage;
    case 101: return heroStatusClass.includes('Regenerate') ? HeroState.Reviving : HeroState.Dead;
    case 50: return HeroState.OnAdventure;

    default:
      console.error(`Unknown hero state: ${status}`);
      return HeroState.Unknown;
  }
};

const parseStateNew = async (): Promise<HeroState> => {
  const page = await getPage();

  //  Cant access className on SVG element for some reason
  const statusClass = await page.$eval('.heroStatus svg[class*="hero"]', x => x.getAttribute('class'));

  switch (statusClass) {
    case 'heroHome': return HeroState.InVillage;
    case 'heroRunning': return HeroState.OnAdventure;

    default:
      console.error(`Unknown hero state: ${statusClass}`);
      return HeroState.Unknown;
  }
};

const parseAdventureCount = async (): Promise<number> => {
  const page = await getPage();
  const pageContent = await page.content();
  const adventureCountMatch = /"boxId":"hero",.*?,"speechBubble":"(\d+)"/.exec(pageContent);

  if (!adventureCountMatch) {
    throw new Error('Failed to parse adventure count');
  }

  return +adventureCountMatch[1];
};

const parseAdventureCountNew = async (): Promise<number> => {
  const page = await getPage();

  const countTextElement = await page.$('.adventure .content');

  if (!countTextElement) {
    return 0;
  }

  const countText = await countTextElement.evaluate(x => (x as HTMLElement).innerText);
  return +countText;
};

const parseHeroVillageId = async (): Promise<number | null> => {
  const page = await getPage();
  const heroStatusMessage = await page.$('.heroStatusMessage > a');

  if (heroStatusMessage) {
    // Dead hero does not have status message, so no village can be recognized
    return heroStatusMessage.evaluate(x => {
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
  }

  return null;
};

const parseHeroVillageIdNew = async (): Promise<number> => {
  const page = await getPage();

  const villageId = await page.$eval('.heroStatus a[href*="newdid"]', x => {
    const heroVillageLink = x.getAttribute('href');

    if (!heroVillageLink) {
      throw new Error('Did not find hero village link');
    }

    const match = /newdid=(\d+)/.exec(heroVillageLink);

    if (!match) {
      throw new Error('Failed to parse hero village id');
    }

    return match[1];
  });

  return +villageId;
};

export const updateHeroInformation = async (): Promise<void> => {
  const { hero } = getAccountContext();

  hero.villageId = gameInfoService.hasNewUI
    ? await parseHeroVillageIdNew()
    : await parseHeroVillageId();

  hero.health = gameInfoService.hasNewUI
    ? await parseHealthNew()
    : await parseHealth();

  hero.state = gameInfoService.hasNewUI
    ? await parseStateNew()
    : await parseState();

  const adventureCount = gameInfoService.hasNewUI
    ? await parseAdventureCountNew()
    : await parseAdventureCount();

  hero.hasAvailableAdventures = adventureCount > 0;

  publishEvent(BotEvent.HeroInformationUpdated);
};
