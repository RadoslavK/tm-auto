import { BuildingType } from '../../../_enums/BuildingType';
import { CoolDown } from '../../../_models/coolDown';
import { AutoPartySettings } from '../../../_models/settings/tasks/AutoPartySettings';
import { Village } from '../../../_models/village/village';
import { getPage } from '../../../browser/getPage';
import { partiesInfo } from '../../../constants/partiesInfo';
import { getPartyDuration } from '../../../parsers/getPartyDuration';
import { ensureBuildingSpotPage} from '../../actions/ensurePage';
import { IBotTask, IBotTaskResultParams } from '../../../_models/tasks';
import { settingsService } from '../../../services/settingsService';

export class AutoPartyTask implements IBotTask {
  private readonly m_village: Village;

  constructor(village: Village) {
    this.m_village = village;
  }

  public settings = (): AutoPartySettings => settingsService.get().village(this.m_village.id).autoParty;

  public execute = async (): Promise<IBotTaskResultParams | undefined> => {
    const {
      partyType,
      minCulturePoints,
    } = this.settings();

    const partyInfo = partiesInfo[partyType];

    const { buildings } = this.m_village;

    const townHall = buildings.spots.ofType(BuildingType.TownHall);

    if (!townHall
      || townHall.level.actual < partyInfo.townHallLevel
      || this.m_village.resources.amount.isLowerThan(partyInfo.cost)) {
      return undefined;
    }

    //  TODO, ensure bere cely spot
    await ensureBuildingSpotPage(townHall.fieldId);
    const page = await getPage();
    const content = await page.content();

    const canThrowParty = content.includes('class="green "');

    if (canThrowParty) {
      const culturePoints = await page.$eval('[class="points"]', x => {
        const cPoints = /(\d+)/.exec((x as HTMLElement).innerText);
        return cPoints ? +cPoints[1] : 0;
      });

      if (culturePoints < minCulturePoints) {
        return undefined;
      }

      // var townhallPageAfterParty = BuildingManager.SelectBuilding(
      //   townHall,
      //   $"&a={(int) partyType}");
    }

    const partyDuration = await getPartyDuration();

    if (!partyDuration) {
      return undefined;
    }

    const nextCoolDown = CoolDown.fromDelay(partyDuration);

    return {
      nextCoolDown,
    };
  };
}
