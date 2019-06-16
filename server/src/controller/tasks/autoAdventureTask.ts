import { BuildingType } from '../../_enums/BuildingType';
import { CoolDown } from '../../_models/coolDown';
import { AdventureCriteria, AutoAdventureSettings } from '../../_models/settings/tasks/AutoAdventureSettings';
import { getPage } from '../../browser/getPage';
import { context } from '../../graphql/context';
import { getSecondsFromString } from '../../utils/getSeconds';
import { getWithMaximum, getWithMinimum } from '../../utils/getWithMaximum';
import { randomElement } from '../../utils/randomElement';
import { ensurePage } from '../actions/ensurePage';
import { IBotTask } from './taskManager';

export class AutoAdventureTask implements IBotTask {
  public settings = (): AutoAdventureSettings => context.settings.hero.autoAdventure;

  public execute = async (): Promise<void> => {
    const village = context.villages.village();
    const settings = this.settings();

    if (settings.preferredVillageId !== village.id) {
      return;
    }

    const spots = village.buildings.spots;
    const hero = context.hero;

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
      page.waitForSelector('#adventureListForm'),
    ]);

    const canDoNormal = hero.health >= settings.normalMinHealth;
    const canDoHard = hero.health >= settings.hardMinHealth;


    const adventureNodes = await page.$$('tr[id]');
    const adventures = await Promise.all(adventureNodes.map(async (node) => {
      const duration = await node.$eval('[id*=walktime]', x => (<HTMLElement>x).innerHTML.trim());
      const difficulty = await node.$eval('[class*=adventureDifficulty]', x => +/adventureDifficulty(\d+)/.exec(x.className)[1]);
      const url = await node.$eval('[id*=goToAdventure] [href]', x => x.getAttribute('href'));

      return {
        duration: getSecondsFromString(duration),
        isHard: difficulty === 0,
        url,
      }
    }));
    let suitableAdventures = adventures
      .filter(x => x.duration <= settings.maxTravelTime)
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

    let selectedAdventureUrl: string;
    //if adventures present
    switch (settings.adventureCriteria) {
      case AdventureCriteria.Random:
        selectedAdventureUrl = randomElement(suitableAdventures).url;
        break;

      case AdventureCriteria.Furthest: {
        const adventure = getWithMaximum(suitableAdventures, x => x.duration);
        selectedAdventureUrl = adventure.url;
        break;
      }

      case AdventureCriteria.FirstToExpire:
        selectedAdventureUrl = suitableAdventures[0].url;
        break;

      case AdventureCriteria.Closest:
      default: {
        const adventure = getWithMinimum(suitableAdventures, x => x.duration);
        selectedAdventureUrl = adventure.url;
        break;
      }
    }

    await ensurePage(selectedAdventureUrl, true);
    const sendToAdventureButton = await page.$('[class="green startAdventure"]');

    //cant send. no rally points, cant do yet etc
    if (!sendToAdventureButton) {
      return;
    }

    await sendToAdventureButton.click();
  };
}
