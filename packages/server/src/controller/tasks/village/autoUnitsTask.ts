import { BuildingType } from 'shared/enums/BuildingType.js';
import { TaskType } from 'shared/enums/TaskType.js';

import type { CoolDown } from '../../../_models/coolDown.js';
import { ClaimHeroResourcesReason } from '../../../_models/logs/content/resourceClaim.js';
import { Resources } from '../../../_models/misc/resources.js';
import type { AutoUnitsSettings } from '../../../_models/settings/tasks/autoUnitsSettings.js';
import type { Units } from '../../../_models/units';
import type { Village } from '../../../_models/village/village.js';
import { AccountContext } from '../../../accountContext.js';
import { getPage } from '../../../browser/getPage.js';
import { parseUnitQueue } from '../../../parsers/units/parseUnitQueue.js';
import { unitInfoService } from '../../../services/info/unitInfoService.js';
import { replaceInputText } from '../../../utils/browser/replaceInputText.js';
import { getActualUnitBuildTime } from '../../../utils/buildTimeUtils.js';
import { mergeVillageAndHeroResources } from '../../../utils/mergeVillageAndHeroResources.js';
import {
  ensureBuildingSpotPage,
  TabInformation,
} from '../../actions/ensurePage.js';
import { claimHeroResources } from '../../actions/hero/claimHeroResources.js';
import { updateUnitsInformation } from '../../actions/updateUnitsInformation.js';
import { updateActualResources } from '../../actions/village/updateResources.js';
import type {
  BotTaskWithCoolDown,
  BotTaskWithCoolDownResult,
} from '../../taskEngine/botTaskEngine.js';

export class AutoUnitsTask implements BotTaskWithCoolDown {
  private readonly _village: Village;

  private readonly _units: Units;

  public readonly type: TaskType = TaskType.AutoUnits;

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
    await updateUnitsInformation();
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

    const possibleUnitsToBuild = unitsToBuild.filter((unit) => unit.autoBuild);
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
    await ensureBuildingSpotPage(unitBuilding.fieldId, tab);
    await updateActualResources();

    const unitQueue = await parseUnitQueue();
    this._units.setQueue(type, unitQueue);

    const suitableToBuild: Record<number, number> = {};
    const { hero } = AccountContext.getContext();
    const totalVillageResources =
      settings.useHeroResources && hero.villageId === this._village.id
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

      if (maxPossibleAmountToBuild < 1) {
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

      if (maxPossibleAmountToBuild < 1) {
        return;
      }

      // check crop balance
      maxPossibleAmountToBuild = Math.min(
        maxPossibleAmountToBuild,
        this._village.resources.amount.crop >= this.settings().minCrop
          ? Number.MAX_VALUE
          : 0,
      );

      // have res for at least 1
      if (maxPossibleAmountToBuild < 1) {
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

      if (maxPossibleAmountToBuild < 1) {
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

    // can build at least 1 with res and fit in queue
    if (!Object.keys(suitableToBuild).length) {
      return;
    }

    if (settings.useHeroResources) {
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

    const page = await getPage();

    for (const [uIndex, amount] of Object.entries(suitableToBuild)) {
      AccountContext.getContext().logsService.logAutoUnits({
        amount,
        index: +uIndex,
      });

      const { tribe } = AccountContext.getContext().gameInfo;
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
