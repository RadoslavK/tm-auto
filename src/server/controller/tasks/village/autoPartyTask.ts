import { getBuildingSpotPath } from '../../../_enums/travianPath';
import { CoolDown } from '../../../_models/coolDown';
import { AutoPartySettings } from '../../../_models/settings/tasks/autoPartySettings';
import { Village } from '../../../_models/village/village';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { TaskType } from '../../../../_shared/types/taskType';
import { getAccountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import { partyInfo } from '../../../constants/partyInfo';
import { getPartyDuration } from '../../../parsers/getPartyDuration';
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

  public allowExecution = (): boolean => getAccountContext().settingsService.account.get().autoParty
    && (this.settings().allowSmall || this.settings().allowLarge);

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    const {
      allowLarge,
      allowSmall,
      minCulturePointsLarge,
      minCulturePointsSmall,
    } = this.settings();

    const townHall = this._village.buildings.spots.ofType(BuildingType.TownHall);

    if (!townHall) {
      return;
    }

    const villageRes = this._village.resources.amount;
    const smallPartyInfo = partyInfo.small;
    const largePartyInfo = partyInfo.large;
    let canDoSmallParty = allowSmall
      && townHall.level.actual >= smallPartyInfo.townHallLevel
      && villageRes.areGreaterOrEqualThan(smallPartyInfo.cost);
    let canDoLargeParty = allowLarge
      && townHall.level.actual >= largePartyInfo.townHallLevel
      && villageRes.areGreaterOrEqualThan(largePartyInfo.cost);

    if (!canDoSmallParty && !canDoLargeParty) {
      return;
    }

    await ensureBuildingSpotPage(townHall.fieldId);
    const page = await getPage();

    let ongoingPartyDuration = await getPartyDuration();

    if (ongoingPartyDuration) {
      const nextCoolDown = CoolDown.fromDuration(ongoingPartyDuration);

      return {
        nextCoolDown,
      };
    }

    const cps = await page.$$eval('.points', xx => xx.map(x => {
      const cPoints = /(\d+)/.exec((x as HTMLElement).innerText);

      if (!cPoints) {
        throw new Error('Did not parse culture points');
      }

      return +cPoints[1];
    }));

    if (canDoLargeParty && cps.length !== 2) {
      throw new Error('No information about large party culture points');
    }

    canDoSmallParty = canDoSmallParty && cps[0] >= minCulturePointsSmall;
    canDoLargeParty = canDoLargeParty && cps[1] >= minCulturePointsLarge;

    if (!canDoSmallParty && !canDoLargeParty) {
      return;
    }

    const partyType = canDoLargeParty ? 'large' : 'small';
    const partyNumber = canDoLargeParty ? 2 : 1;

    const holdPartyNode = await page.$(`.green[onclick*="${getBuildingSpotPath(townHall.fieldId)}&a=${partyNumber}"]`);

    if (!holdPartyNode) {
      throw new Error('Did not find hold party button');
    }

    getAccountContext().logsService.logText(`Throwing ${partyType} parties`, true);

    await Promise.all([
      holdPartyNode.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    ongoingPartyDuration = await getPartyDuration();

    if (!ongoingPartyDuration) {
      throw new Error('Did not find any ongoing party after holding it');
    }

    const nextCoolDown = CoolDown.fromDuration(ongoingPartyDuration);

    return {
      nextCoolDown,
    };
  };
}
