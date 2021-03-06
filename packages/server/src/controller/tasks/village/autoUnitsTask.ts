import { BuildingType } from 'shared/enums/BuildingType.js';
import { VillageTaskType } from 'shared/enums/TaskType.js';

import type { CoolDown } from '../../../_models/coolDown.js';
import { ClaimHeroResourcesReason } from '../../../_models/logs/content/resourceClaim.js';
import { Resources } from '../../../_models/misc/resources.js';
import type { AutoUnitsSettings } from '../../../_models/settings/tasks/autoUnitsSettings.js';
import type { Units } from '../../../_models/units';
import type { Village } from '../../../_models/village/village.js';
import { AccountContext } from '../../../accountContext.js';
import { browserManager } from '../../../browser/browserManager.js';
import { parseUnitQueue } from '../../../parsers/units/parseUnitQueue.js';
import { unitInfoService } from '../../../services/info/unitInfoService.js';
import { replaceInputText } from '../../../utils/browser/replaceInputText.js';
import { getActualUnitBuildTime } from '../../../utils/buildTimeUtils.js';
import { canUseHeroResourcesInVillage } from '../../../utils/getUsableHeroResources.js';
import { mergeVillageAndHeroResources } from '../../../utils/mergeVillageAndHeroResources.js';
import {
  ensureBuildingSpotPage,
  TabInformation,
} from '../../actions/ensurePage.js';
import { claimHeroResources } from '../../actions/hero/claimHeroResources.js';
import { updateHeroResources } from '../../actions/hero/updateHeroResources.js';
import { updateUnitsInformation } from '../../actions/updateUnitsInformation.js';
import { updateActualResources } from '../../actions/village/updateResources.js';
import type {
  BotTaskWithCoolDownResult,
  VillageBotTaskWithCoolDown,
} from '../../taskEngine/botTaskEngine.js';

const parseAvailableUnits = async (): Promise<ReadonlyArray<number>> => {
  const page = await browserManager.getPage();

  const units = await page.$$eval('.bigUnitSection .unitSection', nodes => nodes.map(node => /u(\d+)Section/.exec(node.className)?.[1]));

  return units.filter(Boolean).map(Number);
};

export class AutoUnitsTask implements VillageBotTaskWithCoolDown {
  private readonly _village: Village;

  private readonly _units: Units;

  public readonly type: VillageTaskType = VillageTaskType.AutoUnits;

  constructor(village: Village) {
    this._village = village;
    this._units = village.units;
  }

  private settings = (): AutoUnitsSettings =>
    AccountContext.getContext()
      .settingsService.village(this._village.id)
      .autoUnits.get();

  public allowExecution = (): boolean =>
    AccountContext.getContext().settingsService.account.get().autoUnits &&
    this.settings().allow &&
    [
      BuildingType.Barracks,
      BuildingType.Stable,
      BuildingType.Workshop,
      BuildingType.Residence,
    ].some((x) => this.allowForBuilding(x));

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    await updateUnitsInformation(this._village.id);
    await this.analyzeQueueAndBuildUnits(BuildingType.Barracks);
    await this.analyzeQueueAndBuildUnits(BuildingType.Stable);
    await this.analyzeQueueAndBuildUnits(BuildingType.Workshop);
    await this.analyzeQueueAndBuildUnits(BuildingType.Residence);
    await this.analyzeQueueAndBuildUnits(BuildingType.Palace);
  };

  private allowForBuilding = (type: BuildingType): boolean => {
    const buildingSettings = this.settings().forBuilding(type);

    return (
      buildingSettings.allow &&
      buildingSettings.units.some((uSettings) => uSettings.autoBuild)
    );
  };

  private analyzeQueueAndBuildUnits = async (
    type: BuildingType,
  ): Promise<void> => {
    const settings = this.settings();
    const buildingSettings = settings.forBuilding(type);

    if (!buildingSettings.allow) {
      return;
    }

    const unitsToBuild = buildingSettings.units;

    let possibleUnitsToBuild = unitsToBuild.filter((unit) => unit.autoBuild);
    const buildingSpots = this._village.buildings.spots;
    const isUnitBuildingBuilt = buildingSpots.isBuilt(type);

    if (!possibleUnitsToBuild.length || !isUnitBuildingBuilt) {
      return;
    }

    const unitBuilding = buildingSpots.ofType(type);

    if (!unitBuilding) {
      return;
    }

    const tab: TabInformation | undefined =
      type === BuildingType.Residence || type === BuildingType.Palace
        ? { index: 1, name: 's' }
        : undefined;

    // select appropriate building
    await ensureBuildingSpotPage(unitBuilding.fieldId, unitBuilding.type, tab);
    await updateActualResources();

    const availableUnits = await parseAvailableUnits();
    possibleUnitsToBuild = possibleUnitsToBuild.filter(u => availableUnits.includes(u.index));

    if (!possibleUnitsToBuild.length) {
      return;
    }

    const unitQueue = await parseUnitQueue();
    this._units.setQueue(type, unitQueue);

    const canUseHeroResources = settings.useHeroResources && canUseHeroResourcesInVillage(this._village.id);

    if (canUseHeroResources) {
      await updateHeroResources();
    }

    const suitableToBuild: Record<number, number> = {};
    const totalVillageResources =
      canUseHeroResources
        ? mergeVillageAndHeroResources(this._village.id)
        : this._village.resources.amount;
    let availableResources = new Resources(totalVillageResources);

    const maxAllowedBuildingTime = buildingSettings.maxBuildTime;
    let ongoingBuildingTime = unitQueue.duration;

    possibleUnitsToBuild.forEach((unitToBuild) => {
      const uIndex = unitToBuild.index;
      const {
        buildingTime: originalBuildTime,
        cost,
      } = unitInfoService.getUnitInfo(uIndex);

      // max by res
      let maxPossibleAmountToBuild = Math.min(
        availableResources.wood / cost.wood,
        availableResources.clay / cost.clay,
        availableResources.iron / cost.iron,
        availableResources.crop / cost.crop,
      );

      if (maxPossibleAmountToBuild < unitToBuild.minimumBatch) {
        return;
      }

      //  max by count
      if (!unitToBuild.trainForever) {
        const totalAmount =
          unitQueue.getQueuedCount(uIndex) + this._units.getCount(uIndex);

        maxPossibleAmountToBuild = Math.min(
          maxPossibleAmountToBuild,
          unitToBuild.targetAmount - totalAmount,
        );
      }

      if (maxPossibleAmountToBuild < unitToBuild.minimumBatch) {
        return;
      }

      // check crop balance
      maxPossibleAmountToBuild = Math.min(
        maxPossibleAmountToBuild,
        this._village.resources.amount.crop >= this.settings().minCrop
          ? Number.MAX_VALUE
          : 0,
      );

      if (maxPossibleAmountToBuild < unitToBuild.minimumBatch) {
        return;
      }

      const { speed } = AccountContext.getContext().gameInfo;
      const buildTime = getActualUnitBuildTime(
        originalBuildTime,
        speed,
        unitBuilding.level.actual,
      );

      // by queue time
      const freeBuildingTimeToFill =
        maxAllowedBuildingTime.getTotalSeconds() -
        ongoingBuildingTime.getTotalSeconds();
      maxPossibleAmountToBuild = Math.min(
        maxPossibleAmountToBuild,
        freeBuildingTimeToFill / buildTime.getTotalSeconds(),
      );

      if (maxPossibleAmountToBuild < unitToBuild.minimumBatch) {
        return;
      }

      maxPossibleAmountToBuild = Math.floor(maxPossibleAmountToBuild);
      suitableToBuild[uIndex] = maxPossibleAmountToBuild;
      availableResources = availableResources.subtract(
        cost.multiply(maxPossibleAmountToBuild),
      );
      ongoingBuildingTime = ongoingBuildingTime.add(
        buildTime.multiply(maxPossibleAmountToBuild),
      );
    });

    // can build at least 1 unit kind with res and fit in queue
    if (!Object.keys(suitableToBuild).length) {
      return;
    }

    if (canUseHeroResources) {
      const requiredResources = totalVillageResources.subtract(
        availableResources,
      );
      const resourcesNeeded = requiredResources.subtract(
        this._village.resources.amount,
      );

      if (resourcesNeeded.getTotal() > 0) {
        await claimHeroResources(
          resourcesNeeded,
          ClaimHeroResourcesReason.AutoUnits,
        );
      }
    }

    const page = await browserManager.getPage();
    const { tribe } = this._village;

    for (const [uIndex, amount] of Object.entries(suitableToBuild)) {
      AccountContext.getContext().logsService.logAutoUnits({
        amount,
        index: +uIndex,
        tribe,
      });

      const inputUnitIndex = +uIndex - 10 * (tribe - 1);
      const input = await page.$(`[name=t${inputUnitIndex}]`);

      if (input) {
        await replaceInputText(page, input, amount.toString());
      }
    }

    const submitButton = await page.$('.green.startTraining');

    if (!submitButton) {
      return;
    }

    await Promise.all([
      submitButton.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    await updateActualResources();
  };
}
