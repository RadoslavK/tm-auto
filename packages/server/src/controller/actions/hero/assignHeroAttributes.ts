import { TravianPath } from '../../../_enums/travianPath.js';
import { getAccountContext } from '../../../accountContext.js';
import { getPage } from '../../../browser/getPage.js';
import { BotEvent } from '../../../events/botEvent.js';
import { parseHasHeroLevelUp } from '../../../parsers/hero/parseHasHeroLevelUp.js';
import { publishPayloadEvent } from '../../../pubSub.js';
import { replaceInputText } from '../../../utils/browser/replaceInputText.js';
import { ensurePage } from '../ensurePage.js';

type EnsurePointParams = {
  readonly availablePoints: number;
  readonly requested: number;
  readonly inputName: string;
};

type EnsurePointResult = {
  readonly added: number;
  readonly success: boolean;
};

const ensureHeroPoint = async ({
  availablePoints,
  inputName,
  requested,
}: EnsurePointParams): Promise<EnsurePointResult> => {
  const page = await getPage();

  const actual = await page.evaluate(
    ({ inputName }) => {
      const input = document.querySelector(`[name="${inputName}"]`);

      if (!input) {
        throw new Error('Did not find input');
      }

      return +(input.getAttribute('value') ?? '0');
    },
    { inputName },
  );

  const toAdd = Math.min(availablePoints, Math.max(0, requested - actual));

  if (!toAdd) {
    return {
      added: 0,
      success: actual >= requested,
    };
  }

  const total = actual + toAdd;

  getAccountContext().logsService.logText(
    `Adding hero attribute Offensive Strength: ${actual} -> ${total}`,
  );

  const input = await page.$(`[name="${inputName}"]`);

  if (!input) {
    throw new Error(`Did not find input for: ${inputName}`);
  }

  await replaceInputText(page, input, total.toString());

  return {
    added: toAdd,
    success: total >= requested,
  };
};

export const assignHeroAttributes = async () => {
  const settingsService = getAccountContext().settingsService.hero.heroLevelUp;
  const { levelUpItems } = settingsService.get();

  if (!levelUpItems.length) {
    return;
  }

  const hasLevelUp = await parseHasHeroLevelUp();

  if (!hasLevelUp) {
    return;
  }

  await ensurePage(TravianPath.Hero, true);

  const page = await getPage();

  const initialAvailablePoints = await page.$eval('#availablePoints', (e) => {
    const match = /(\d+)\//.exec((e as HTMLElement).innerText);

    if (!match) {
      throw new Error('Didnt find available hero points');
    }

    return +match[1];
  });

  let availablePoints = initialAvailablePoints;

  for (const item of levelUpItems) {
    if (!availablePoints) {
      return;
    }

    const strengthResult = await ensureHeroPoint({
      inputName: 'attributepower',
      requested: item.offensiveStrength,
      availablePoints,
    });

    if (!strengthResult.success) {
      return;
    }

    availablePoints -= strengthResult.added;

    const offBonusResult = await ensureHeroPoint({
      inputName: 'attributeoffBonus',
      requested: item.offBonus,
      availablePoints,
    });

    if (!offBonusResult.success) {
      return;
    }

    availablePoints -= offBonusResult.added;

    const defBonusResult = await ensureHeroPoint({
      inputName: 'attributedefBonus',
      requested: item.defBonus,
      availablePoints,
    });

    if (!defBonusResult.success) {
      return;
    }

    availablePoints -= defBonusResult.added;

    const resourcesResult = await ensureHeroPoint({
      inputName: 'attributeproductionPoints',
      requested: item.resources,
      availablePoints,
    });

    if (!resourcesResult.success) {
      return;
    }

    availablePoints -= resourcesResult.added;

    // Click away for the submit button to appear
    await Promise.all([
      page.click('#attributesOfHero'),
      page.waitForSelector('#saveHeroAttributes'),
    ]);

    if (availablePoints !== initialAvailablePoints) {
      await Promise.all([
        page.click('#saveHeroAttributes'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      ]);
    }

    const updatedLevelUpItems = settingsService.get().levelUpItems.slice(1);

    settingsService.merge({
      levelUpItems: updatedLevelUpItems,
    });

    publishPayloadEvent(BotEvent.HeroLevelUpSettingsChanged, {
      settings: {
        levelUpItems: updatedLevelUpItems,
      },
    });
  }
};