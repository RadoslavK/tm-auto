import { CoolDown } from '../../../_models/coolDown';
import { AutoPartySettings } from '../../../_models/settings/tasks/autoPartySettings';
import { Village } from '../../../_models/village/village';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { TaskType } from '../../../../_shared/types/taskType';
import { getAccountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import { getPartyDuration } from '../../../parsers/getPartyDuration';
import { partyInfoService } from '../../../services/info/partyInfoService';
import { ensureBuildingSpotPage } from '../../actions/ensurePage';
import {
  BotTaskWithCoolDown,
  BotTaskWithCoolDownResult,
} from '../../taskEngine/botTaskEngine';

export class AutoPartyTask implements BotTaskWithCoolDown {
  public readonly type: TaskType = TaskType.AutoParty;

  private readonly _village: Village;

  constructor(village: Village) {
    this._village = village;
  }

  private settings = (): AutoPartySettings => getAccountContext().settingsService.village(this._village.id).autoParty.get();

  public allowExecution = (): boolean => getAccountContext().settingsService.general.get().autoParty
    && this.settings().allow;

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    const {
      minCulturePoints,
      partyType,
    } = this.settings();

    const partyInfo = partyInfoService.get(partyType);

    const townHall = this._village.buildings.spots.ofType(BuildingType.TownHall);

    if (!townHall
      || townHall.level.actual < partyInfo.townHallLevel
      || this._village.resources.amount.areLowerThan(partyInfo.cost)) {
      return;
    }

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
        return;
      }
    }

    const partyDuration = await getPartyDuration();

    if (!partyDuration) {
      return;
    }

    const nextCoolDown = CoolDown.fromDuration(partyDuration);

    getAccountContext().logsService.logText(`Throwing ${partyType} parties`, true);

    return {
      nextCoolDown,
    };
  };
}
