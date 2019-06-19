import { BuildingType } from '../../../_enums/BuildingType';
import { CoolDown } from '../../../_models/coolDown';
import { AutoPartySettings } from '../../../_models/settings/tasks/AutoPartySettings';
import { Village } from '../../../_models/village/village';
import { getPage } from '../../../browser/getPage';
import { partiesInfo } from '../../../constants/partiesInfo';
import { context } from '../../../graphql/context';
import { getPartyDuration } from '../../../parsers/getPartyDuration';
import { ensureBuildingSpotPage} from '../../actions/ensurePage';
import { IBotTask, IBotTaskResultParams } from '../taskManager';

export class AutoPartyTask implements IBotTask {
  private readonly _village: Village;

  constructor(village: Village) {
    this._village = village;
  }

  public settings = (): AutoPartySettings => context.settings.village(this._village.id).autoParty;

  public execute = async (): Promise<IBotTaskResultParams> => {
    const {
      partyType,
      minCulturePoints,
    } = this.settings();

    const partyInfo = partiesInfo[partyType];

    const buildings = this._village.buildings;

    const townHall = buildings.spots.ofType(BuildingType.TownHall);

    if (!townHall
      || townHall.level.actual < partyInfo.townHallLevel
      || this._village.resources.amount.isLowerThan(partyInfo.cost)) {
      return;
    }

    //  TODO, ensure bere cely spot
    await ensureBuildingSpotPage(townHall.fieldId);
    const page = await getPage();
    const content = await page.content();

    const canThrowParty = content.includes('class="green "');

    if (canThrowParty) {
      const culturePoints = await page.$eval('[class="points"]', x => +/(\d+)/.exec((<HTMLElement>x).innerText)[1]);

      if (culturePoints < minCulturePoints) {
        return;
      }

      // var townhallPageAfterParty = BuildingManager.SelectBuilding(
      //   townHall,
      //   $"&a={(int) partyType}");
    }

    const partyDuration = await getPartyDuration();
    const nextCoolDown = CoolDown.fromDelay(partyDuration);
    return {
      nextCoolDown,
    };
  };
}
