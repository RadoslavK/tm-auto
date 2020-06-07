import { TravianPath } from '../../../_enums/travianPath';
import { Resources } from '../../../_models/misc/resources';
import { getAccountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import { heroItemIds } from '../../../constants/heroItemIds';
import { replaceInputText } from '../../../utils/browser/replaceInputText';
import { ensurePage } from '../ensurePage';

export const claimHeroResources = async (resources: Resources): Promise<void> => {
  const page = await getPage();

  const claimResource = async (resource: keyof Pick<Resources, 'wood' | 'clay' | 'iron' | 'crop'>): Promise<void> => {
    const amount = resources[resource];

    if (amount <= 0) {
      return;
    }

    if (amount > getAccountContext().hero.resources[resource]) {
      throw new Error('Requested more resources than available!');
    }

    const itemNode = await page.$(`#itemsToSale .item[class*="item_${heroItemIds[resource]}"]`);

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
    await page.waitFor(1000);
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
};