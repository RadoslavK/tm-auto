import {
  BotTaskResult,
  IVillageBotTask,
} from '../_types';
import { CoolDown } from '../../../_models/coolDown';
import { AutoPartySettings } from '../../../_models/settings/tasks/autoPartySettings';
import { Village } from '../../../_models/village/village';
import { VillageTaskType } from '../../../_types/graphql';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { accountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import { partiesInfo } from '../../../constants/partiesInfo';
import { getPartyDuration } from '../../../parsers/getPartyDuration';
import { ensureBuildingSpotPage } from '../../actions/ensurePage';

export class AutoPartyTask implements IVillageBotTask {
  public readonly type: VillageTaskType = VillageTaskType.AutoParty;

  private readonly m_village: Village;

  constructor(village: Village) {
    this.m_village = village;
  }

  private settings = (): AutoPartySettings => accountContext.settingsService.village(this.m_village.id).autoParty.get();

  public allowExecution = (): boolean => this.settings().allow;

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): BotTaskResult => {
    const {
      partyType,
      minCulturePoints,
    } = this.settings();

    const partyInfo = partiesInfo[partyType];

    const townHall = this.m_village.buildings.spots.ofType(BuildingType.TownHall);

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
    }

    const partyDuration = await getPartyDuration();

    if (!partyDuration) {
      return undefined;
    }

    const nextCoolDown = CoolDown.fromDuration(partyDuration);

    accountContext.logsService.logText(`Throwing ${partyType} parties`, true);

    return {
      nextCoolDown,
    };
  };
}
