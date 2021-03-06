import { BuildingType } from 'shared/enums/BuildingType.js';
import { VillageTaskType } from 'shared/enums/TaskType.js';

import { getBuildingSpotPath } from '../../../_enums/travianPath.js';
import { CoolDown } from '../../../_models/coolDown.js';
import { ClaimHeroResourcesReason } from '../../../_models/logs/content/resourceClaim.js';
import type { AutoPartySettings } from '../../../_models/settings/tasks/autoPartySettings.js';
import type { Village } from '../../../_models/village/village.js';
import { AccountContext } from '../../../accountContext.js';
import { browserManager } from '../../../browser/browserManager.js';
import { partyInfo } from '../../../constants/partyInfo.js';
import { getPartyDuration } from '../../../parsers/getPartyDuration.js';
import { canUseHeroResourcesInVillage } from '../../../utils/getUsableHeroResources.js';
import { mergeVillageAndHeroResources } from '../../../utils/mergeVillageAndHeroResources.js';
import { ensureBuildingSpotPage } from '../../actions/ensurePage.js';
import { claimHeroResources } from '../../actions/hero/claimHeroResources.js';
import { updateHeroResources } from '../../actions/hero/updateHeroResources.js';
import { updateActualResources } from '../../actions/village/updateResources.js';
import type {
  BotTaskWithCoolDownResult,
  VillageBotTaskWithCoolDown,
} from '../../taskEngine/botTaskEngine.js';

export class AutoPartyTask implements VillageBotTaskWithCoolDown {
  public readonly type: VillageTaskType = VillageTaskType.AutoParty;

  private readonly _village: Village;

  constructor(village: Village) {
    this._village = village;
  }

  private settings = (): AutoPartySettings =>
    AccountContext.getContext()
      .settingsService.village(this._village.id)
      .autoParty.get();

  public allowExecution = (): boolean =>
    AccountContext.getContext().settingsService.account.get().autoParty &&
    (this.settings().allowSmall || this.settings().allowLarge);

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    const {
      allowLarge,
      allowSmall,
      useHeroResources,
    } = this.settings();

    const canUseHeroResources = useHeroResources && canUseHeroResourcesInVillage(this._village.id);

    const townHall = this._village.buildings.spots.ofType(
      BuildingType.TownHall,
    );

    if (!townHall) {
      return;
    }

    if (canUseHeroResources) {
      await updateHeroResources();
    }

    const villageRes = this._village.resources.amount;
    const totalRes =
      canUseHeroResources
        ? mergeVillageAndHeroResources(this._village.id)
        : villageRes;
    const smallPartyInfo = partyInfo.small;
    const largePartyInfo = partyInfo.large;
    let canDoSmallParty =
      allowSmall &&
      townHall.level.actual >= smallPartyInfo.townHallLevel &&
      totalRes.isGreaterOrEqualThan(smallPartyInfo.cost);
    let canDoLargeParty =
      allowLarge &&
      townHall.level.actual >= largePartyInfo.townHallLevel &&
      totalRes.isGreaterOrEqualThan(largePartyInfo.cost);

    if (!canDoSmallParty && !canDoLargeParty) {
      return;
    }

    await ensureBuildingSpotPage(townHall.fieldId);
    const page = await browserManager.getPage();

    let ongoingPartyDuration = await getPartyDuration();

    if (ongoingPartyDuration) {
      const nextCoolDown = CoolDown.fromDuration(ongoingPartyDuration);

      return {
        alwaysUseNextCoolDown: true,
        nextCoolDown,
      };
    }

    if (!canDoSmallParty && !canDoLargeParty) {
      return;
    }

    const partyType = canDoLargeParty ? 'large' : 'small';
    const partyNumber = canDoLargeParty ? 2 : 1;

    if (canUseHeroResources) {
      const requiredRes = canDoLargeParty
        ? largePartyInfo.cost
        : smallPartyInfo.cost;

      const neededRes = requiredRes.subtract(villageRes);

      if (neededRes.getTotal() > 0) {
        await claimHeroResources(neededRes, ClaimHeroResourcesReason.AutoParty);
        await ensureBuildingSpotPage(townHall.fieldId);
      }
    }

    const holdPartyNode = await page.$(`.green[onclick*="${getBuildingSpotPath(townHall.fieldId)}&a=${partyNumber}"]`);

    if (!holdPartyNode) {
      throw new Error('Did not find hold party button');
    }

    AccountContext.getContext().logsService.logText(
      `Throwing ${partyType} parties`,
      true,
    );

    await Promise.all([
      holdPartyNode.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    ongoingPartyDuration = await getPartyDuration();

    if (!ongoingPartyDuration) {
      throw new Error('Did not find any ongoing party after holding it');
    }

    await updateActualResources();

    const nextCoolDown = CoolDown.fromDuration(ongoingPartyDuration);

    return {
      alwaysUseNextCoolDown: true,
      nextCoolDown,
    };
  };
}
