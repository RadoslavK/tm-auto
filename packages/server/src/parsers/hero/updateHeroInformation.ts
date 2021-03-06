import { HeroState } from '../../_models/hero/hero.js';
import { AccountContext } from '../../accountContext.js';
import { browserManager } from '../../browser/browserManager.js';
import { assignHeroAttributes } from '../../controller/actions/hero/assignHeroAttributes.js';
import { updateHeroResources } from '../../controller/actions/hero/updateHeroResources.js';
import { BotEvent } from '../../events/botEvent.js';
import { publishEvent } from '../../pubSub.js';
import { activityService } from '../../services/botActivityService.js';

const parseHealth = async (): Promise<number> => {
  const page = await browserManager.getPage();

  const healthTooltip = await page.$eval(
    '#topBarHero .health .title',
    (x: any) => x._travianTooltip.text,
  );

  const match = /(\d+)/.exec(healthTooltip);

  if (!match) {
    throw new Error('Failed to parse hero health');
  }

  return +match[1];
};

const parseState = async (): Promise<HeroState> => {
  const page = await browserManager.getPage();

  //  Cant access className on SVG element for some reason
  const statusClass = await page.$eval('.heroStatus svg[class*="hero"]', (x) =>
    x.getAttribute('class'),
  );

  switch (statusClass) {
    case 'heroHome':
      return HeroState.InVillage;
    case 'heroRunning':
      return HeroState.Moving;
    case 'heroReviving':
      return HeroState.Reviving;
    case 'heroDead':
      return HeroState.Dead;
    case 'heroReinforcing':
      return HeroState.Reinforcing;

    default:
      throw new Error(`Unknown hero state: ${statusClass}`);
  }
};

const parseAdventureCount = async (): Promise<number> => {
  const page = await browserManager.getPage();

  const countTextElement = await page.$('.adventure .content');

  if (!countTextElement) {
    return 0;
  }

  const countText = await countTextElement.evaluate(
    (x) => (x as HTMLElement).innerText,
  );
  return +countText;
};

const parseHeroVillageId = async (): Promise<string | null> => {
  if (AccountContext.getContext().hero.state === HeroState.Reinforcing) {
    return null;
  }

  const page = await browserManager.getPage();

  const villageId = await page.$eval('.heroStatus a[href*="newdid"]', (x) => {
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

  return villageId;
};

export const updateHeroInformation = async (): Promise<void> => {
  activityService.setActivity('Updating hero information');
  const { hero } = AccountContext.getContext();

  hero.health = await parseHealth();

  hero.state = await parseState();

  hero.villageId =
    hero.state === HeroState.Dead || hero.state === HeroState.Reviving
      ? null
      : await parseHeroVillageId();

  const adventureCount = await parseAdventureCount();

  hero.hasAvailableAdventures = adventureCount > 0;

  await updateHeroResources();

  publishEvent(BotEvent.HeroInformationUpdated);

  await assignHeroAttributes();
};
