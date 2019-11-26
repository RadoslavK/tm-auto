import { BuildingType } from '../../../_enums/BuildingType';
import { AutoAdventureSettings } from '../../../_models/settings/tasks/AutoAdventureSettings';
import { getPage } from '../../../browser/getPage';
import { getWithMaximum, getWithMinimum } from '../../../utils/getWithMaximum';
import { randomElement } from '../../../utils/randomElement';
import { accountContext } from '../../../accountContext';
import { CoolDown } from '../../../_models/coolDown';
import { Duration } from '../../../_models/duration';
import { IAdventureCriteria } from '../../../_types/graphql';
import {
  BotTaskResult,
  IBotTask,
} from '../_types';

export class AutoAdventureTask implements IBotTask {
  private settings = (): AutoAdventureSettings => accountContext.settingsService.hero.autoAdventure.get();

  public allowExecution = (): boolean => {
    //  TODO rather generate this task only for the current village when hero can actually do it
    const settings = this.settings();
    const { hero } = accountContext;

    const { currentVillageId } = accountContext.villageService;
    return settings.allow && settings.preferredVillageId === currentVillageId && settings.preferredVillageId === hero.villageId;
  };

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): BotTaskResult => {
    const village = accountContext.villageService.currentVillage();
    const settings = this.settings();

    const { spots } = village.buildings;
    const { hero } = accountContext;

    if (!spots.isBuilt(BuildingType.RallyPoint)
    || !hero.canGoToAdventure()) {
      return;
    }

    const page = await getPage();
    const adventuresButton = await page.$('[class*="adventureWhite"]');

    if (!adventuresButton) {
      return;
    }

    await Promise.all([
      adventuresButton.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    const canDoNormal = hero.health >= settings.normalMinHealth;
    const canDoHard = hero.health >= settings.hardMinHealth;

    const adventureNodes = await page.$$('tr[id]');
    const adventures = (await Promise.all(adventureNodes.map(async (node) => {
      const duration = await node.$eval('[id*=walktime]', x => (x as HTMLElement).innerHTML.trim());
      const difficulty = await node.$eval('[class*=adventureDifficulty]', x => {
        const difficultyClass = /adventureDifficulty(\d+)/.exec(x.className);

        return difficultyClass
          ? +difficultyClass[1]
          : null;
      });

      const linkElementId = await node.$eval('[id*=goToAdventure]', x => x.getAttribute('id'));

      if (!linkElementId) {
        throw new Error('Link for adventure not found');
      }

      return {
        duration,
        isHard: difficulty === 0,
        linkElementId,
      };
    })))
      .map(adventure => ({
        ...adventure,
        duration: Duration.fromText(adventure.duration),
      }));

    let suitableAdventures = adventures
      .filter(x => x.duration.totalSeconds() <= settings.maxTravelTime.totalSeconds())
      .filter(x => (x.isHard && canDoHard) || (!x.isHard && canDoNormal));

    if (!suitableAdventures.length) {
      return;
    }

    if (settings.preferHard && canDoHard) {
      const hardAdventures = suitableAdventures.filter(x => x.isHard);

      if (hardAdventures.length) {
        suitableAdventures = hardAdventures;
      }
    }

    if (!suitableAdventures.length) {
      return;
    }

    let selectedLinkElementId: string;
    // if adventures present
    switch (settings.adventureCriteria) {
      case IAdventureCriteria.Random:
        selectedLinkElementId = randomElement(suitableAdventures).linkElementId;
        break;

      case IAdventureCriteria.Furthest: {
        const adventure = getWithMaximum(suitableAdventures, x => x.duration.totalSeconds());
        selectedLinkElementId = adventure.linkElementId;
        break;
      }

      case IAdventureCriteria.FirstToExpire:
        selectedLinkElementId = suitableAdventures[0].linkElementId;
        break;

      case IAdventureCriteria.Closest:
      default: {
        const adventure = getWithMinimum(suitableAdventures, x => x.duration.totalSeconds());
        selectedLinkElementId = adventure.linkElementId;
        break;
      }
    }

    const linkElement = await page.$(`#${selectedLinkElementId}`);

    if (!linkElement) {
      throw new Error('Link element for selected adventure was not found');
    }

    await Promise.all([
      linkElement.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    const sendToAdventureButton = await page.$('[class="adventureSendButton"] [class="green "]');

    // cant send. no rally points, cant do yet etc
    if (!sendToAdventureButton) {
      return;
    }

    accountContext.logsService.logText('Sending hero to adventure');

    await Promise.all([
      sendToAdventureButton.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  };
}
