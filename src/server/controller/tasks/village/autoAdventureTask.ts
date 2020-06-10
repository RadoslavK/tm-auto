import { CoolDown } from '../../../_models/coolDown';
import { Duration } from '../../../_models/duration';
import { AutoAdventureSettings } from '../../../_models/settings/tasks/autoAdventureSettings';
import { AdventureCriteria } from '../../../../_shared/types/adventureCriteria';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { TaskType } from '../../../../_shared/types/taskType';
import { getAccountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import {
  getWithMaximumSafe,
  getWithMinimumSafe,
} from '../../../utils/getWithMaximum';
import { randomElement } from '../../../utils/randomElement';
import {
  BotTaskWithCoolDown,
  BotTaskWithCoolDownResult,
} from '../../taskEngine/botTaskEngine';

export class AutoAdventureTask implements BotTaskWithCoolDown {
  public readonly type: TaskType = TaskType.AutoAdventure;

  private settings = (): AutoAdventureSettings => getAccountContext().settingsService.hero.autoAdventure.get();

  public allowExecution = (): boolean => {
    const settings = this.settings();
    const { hero } = getAccountContext();

    const { currentVillageId } = getAccountContext().villageService;
    return settings.allow && settings.preferredVillageId === currentVillageId && settings.preferredVillageId === hero.villageId;
  };

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    const village = getAccountContext().villageService.currentVillage();
    const settings = this.settings();

    const { spots } = village.buildings;
    const { hero } = getAccountContext();

    if (!spots.isBuilt(BuildingType.RallyPoint)
    || !hero.canGoToAdventure()) {
      return;
    }

    const page = await getPage();
    const adventuresButton = await page.$('.adventure.green');

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
      .filter(x => x.duration.getTotalSeconds() <= settings.maxTravelTime.getTotalSeconds())
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
      case AdventureCriteria.Random:
        selectedLinkElementId = randomElement(suitableAdventures).linkElementId;
        break;

      case AdventureCriteria.Furthest: {
        const adventure = getWithMaximumSafe(suitableAdventures, x => x.duration.getTotalSeconds());
        selectedLinkElementId = adventure.linkElementId;
        break;
      }

      case AdventureCriteria.FirstToExpire:
        selectedLinkElementId = suitableAdventures[0].linkElementId;
        break;

      case AdventureCriteria.Closest:
      default: {
        const adventure = getWithMinimumSafe(suitableAdventures, x => x.duration.getTotalSeconds());
        selectedLinkElementId = adventure.linkElementId;
        break;
      }
    }

    const sendLinkElement = await page.$(`#${selectedLinkElementId}`);

    if (!sendLinkElement) {
      throw new Error('Link element for selected adventure was not found');
    }

    getAccountContext().logsService.logText('Sending hero to adventure');

    await Promise.all([
      sendLinkElement.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  };
}
