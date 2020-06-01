import { CoolDown } from '../../../_models/coolDown';
import { AutoUnitsSettings } from '../../../_models/settings/tasks/autoUnitsSettings';
import { Units } from '../../../_models/units';
import { Village } from '../../../_models/village/village';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { TaskType } from '../../../../_shared/types/taskType';
import { accountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import { parseUnitQueue } from '../../../parsers/units/parseUnitQueue';
import { unitInfoService } from '../../../services/info/unitInfoService';
import { getActualUnitBuildTime } from '../../../utils/buildTimeUtils';
import {
  ensureBuildingSpotPage,
  TabInformation,
} from '../../actions/ensurePage';
import { updateUnitsInformation } from '../../actions/updateUnitsInformation';
import { updateActualResources } from '../../actions/village/updateResources';
import {
  BotTaskWithCoolDown,
  BotTaskWithCoolDownResult,
} from '../../taskEngine/botTaskEngine';

export class AutoUnitsTask implements BotTaskWithCoolDown {
  private readonly _village: Village;
  private readonly _units: Units;

  public readonly type: TaskType = TaskType.AutoUnits;

  constructor(village: Village) {
    this._village = village;
    this._units = village.units;
  }

  private settings = (): AutoUnitsSettings => accountContext.settingsService.village(this._village.id).autoUnits.get();

  public allowExecution = (): boolean =>
    accountContext.settingsService.general.get().autoUnits
    && this.settings().allow
    && [BuildingType.Barracks, BuildingType.Stable, BuildingType.Workshop, BuildingType.Residence].some(x => this.allowForBuilding(x));

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

    return buildingSettings.allow
      && buildingSettings.units.some(uSettings => uSettings.autoBuild);
  };

  private analyzeQueueAndBuildUnits = async (type: BuildingType): Promise<void> => {
    const settings = this.settings();
    const buildingSettings = settings.forBuilding(type);

    if (!buildingSettings.allow) {
      return;
    }

    const unitsToBuild = buildingSettings.units;

    const possibleUnitsToBuild = unitsToBuild.filter(unit => unit.autoBuild);
    const buildingSpots = this._village.buildings.spots;
    const isUnitBuildingBuilt = buildingSpots.isBuilt(type);

    if (!possibleUnitsToBuild.length
      || !isUnitBuildingBuilt) {
      return;
    }

    const unitBuilding = buildingSpots.ofType(type);

    if (!unitBuilding) {
      return;
    }

    const tab: TabInformation | undefined = type === BuildingType.Residence || type === BuildingType.Palace
      ? { index: 1, name: 's' }
      : undefined;

    // select appropriate building
    await ensureBuildingSpotPage(unitBuilding.fieldId, tab);
    await updateActualResources();

    const unitQueue = await parseUnitQueue();
    this._units.setQueue(type, unitQueue);

    const suitableToBuild: Record<number, number> = {};
    let startingVillageRes = this._village.resources.amount;

    const maxAllowedBuildingTime = buildingSettings.maxBuildTime;
    let ongoingBuildingTime = unitQueue.duration;

    possibleUnitsToBuild.forEach(unitToBuild => {
      const uIndex = unitToBuild.index;
      const {
        buildTime: originalBuildTime,
        resources: cost,
      } = unitInfoService.getUnitInfo(uIndex).cost;

      // max by res
      let maxPossibleAmountToBuild = Math.min(
        startingVillageRes.wood / cost.wood,
        startingVillageRes.clay / cost.clay,
        startingVillageRes.iron / cost.iron,
        startingVillageRes.crop / cost.crop,
      );

      if (maxPossibleAmountToBuild < 1) {
        return;
      }

      //  max by count
      if (!unitToBuild.trainForever) {
        // TODO if no unitCounts then check rally point
        const totalAmount = unitQueue.getQueuedCount(uIndex) + this._units.getCount(uIndex);

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

      const { speed } = accountContext.gameInfo;
      const buildTime = getActualUnitBuildTime(originalBuildTime, speed, unitBuilding.level.actual);

      // by queue time
      const freeBuildingTimeToFill = maxAllowedBuildingTime.getTotalSeconds() - ongoingBuildingTime.getTotalSeconds();
      maxPossibleAmountToBuild = Math.min(maxPossibleAmountToBuild, freeBuildingTimeToFill / buildTime.getTotalSeconds());

      if (maxPossibleAmountToBuild < 1) {
        return;
      }

      maxPossibleAmountToBuild = Math.floor(maxPossibleAmountToBuild);
      suitableToBuild[uIndex] = maxPossibleAmountToBuild;
      startingVillageRes = startingVillageRes.subtract(cost.multiply(maxPossibleAmountToBuild));
      ongoingBuildingTime = ongoingBuildingTime.add(buildTime.multiply(maxPossibleAmountToBuild));
    });

    // can build at least 1 with res and fit in queue
    if (!Object.keys(suitableToBuild).length) {
      return;
    }

    const page = await getPage();

    for (const [uIndex, amount] of Object.entries(suitableToBuild)) {
      accountContext.logsService.logAutoUnits({
        amount,
        index: +uIndex,
      });

      const { tribe } = accountContext.gameInfo;
      const inputUnitIndex = +uIndex - (10 * (tribe - 1));
      const input = await page.$(`[name=t${inputUnitIndex}]`);

      if (input) {
        await input.focus();
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control');
        await page.keyboard.down('Backspace');
        await input.type(amount.toString());
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
