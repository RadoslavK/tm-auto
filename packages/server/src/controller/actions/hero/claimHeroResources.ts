import { TravianPath } from '../../../_enums/travianPath.js';
import type { ClaimHeroResourcesReason } from '../../../_models/logs/content/resourceClaim.js';
import type { Resources } from '../../../_models/misc/resources.js';
import { AccountContext } from '../../../accountContext.js';
import { browserManager } from '../../../browser/browserManager.js';
import { heroItemIds } from '../../../constants/heroItemIds.js';
import { BotEvent } from '../../../events/botEvent.js';
import { publishEvent } from '../../../pubSub.js';
import { replaceInputText } from '../../../utils/browser/replaceInputText.js';
import { ensurePage } from '../ensurePage.js';
import { updateHeroResources } from './updateHeroResources.js';

export const claimHeroResources = async (
  resources: Resources,
  reason: ClaimHeroResourcesReason,
): Promise<void> => {
  AccountContext.getContext().logsService.logResourceClaim(resources, reason);
  const page = await browserManager.getPage();

  const claimResource = async (
    resource: keyof Pick<Resources, 'wood' | 'clay' | 'iron' | 'crop'>,
  ): Promise<void> => {
    const amount = resources[resource];

    if (amount <= 0) {
      return;
    }

    if (amount > AccountContext.getContext().hero.resources[resource]) {
      throw new Error('Requested more resources than available!');
    }

    const itemNode = await page.$(
      `#itemsToSale .item[class*="item_${heroItemIds[resource]}"]`,
    );

    if (!itemNode) {
      throw new Error(`Did not find hero item resource: ${resource}`);
    }

    await itemNode.click();

    const amountInput = await page.$('#amount');

    if (!amountInput) {
      throw new Error('Did not find input for hero item resource');
    }

    // TODO :It dynamically sets value to all hero resources and interferes with puppeteer
    // https://stackoverflow.com/questions/62244878/puppeteer-does-not-return-current-value-of-the-input
    await page.waitForTimeout(1000);
    await replaceInputText(page, amountInput, amount.toString());

    const submitButton = await page.$('.green[type="submit"]');

    if (!submitButton) {
      throw new Error('Did not find submit button');
    }

    await Promise.all([
      submitButton.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  };

  await ensurePage(TravianPath.Hero, true);

  await claimResource('wood');
  await claimResource('clay');
  await claimResource('iron');
  await claimResource('crop');
  await updateHeroResources();
  publishEvent(BotEvent.HeroInformationUpdated);
};
