import { BuildingType } from '../../../_enums/BuildingType';
import { AutoUnitsSettings } from '../../../_models/settings/tasks/AutoUnitsSettings';
import { Units } from '../../../_models/units';
import { Village } from '../../../_models/village/village';
import { getPage } from '../../../browser/getPage';
import { unitInfos } from '../../../bootstrap/loadInfo';
import { parseUnitQueue } from '../../../parsers/units/parseUnitQueue';
import { getActualUnitBuildTime } from '../../../utils/buildTimeUtils';
import { ensureBuildingSpotPage } from '../../actions/ensurePage';
import { updateActualResources } from '../../actions/village/updateResources';
import { IBotTask } from '../../../_models/tasks';
import { SettingsService } from '../../../services/settings';
import { playerService } from '../../../services/playerService';
import { logsService } from '../../../services/logsService';

export class AutoUnitsTask implements IBotTask {
  private readonly m_village: Village;
  private readonly m_units: Units;

  constructor(village: Village) {
    this.m_village = village;
    this.m_units = village.units;
  }

  public settings = (): AutoUnitsSettings => SettingsService.instance().village(this.m_village.id).autoUnits.get();

  public execute = async (): Promise<void> => {
    await this.analyzeQueueAndBuildUnits(BuildingType.Barracks);
    await this.analyzeQueueAndBuildUnits(BuildingType.Stable);
    await this.analyzeQueueAndBuildUnits(BuildingType.Workshop);
    await this.analyzeQueueAndBuildUnits(BuildingType.Residence);
    await this.analyzeQueueAndBuildUnits(BuildingType.Palace);
  };

  private analyzeQueueAndBuildUnits = async (type: BuildingType): Promise<void> => {
    const settings = this.settings().forBuilding(type);
    const unitsToBuild = settings.units;

    const possibleUnitsToBuild = unitsToBuild.filter(unit => unit.autoBuild);
    const buildingSpots = this.m_village.buildings.spots;
    const isUnitBuildingBuilt = buildingSpots.isBuilt(type);

    if (!possibleUnitsToBuild.length
      || !isUnitBuildingBuilt) {
      return;
    }

    const unitBuilding = buildingSpots.ofType(type);

    if (!unitBuilding) {
      return;
    }

    // select appropriate building
    await ensureBuildingSpotPage(unitBuilding.fieldId);
    await updateActualResources();

    const unitQueue = await parseUnitQueue();
    this.m_units.setQueue(type, unitQueue);

    const suitableToBuild: Record<number, number> = {};
    let startingVillageRes = this.m_village.resources.amount;

    const maxAllowedBuildingTime = settings.maxBuildTime;
    let ongoingBuildingTime = unitQueue.duration;

    possibleUnitsToBuild.forEach(unitToBuild => {
      const uIndex = unitToBuild.index;
      const cost = unitInfos[uIndex].cost.resources;

      // max by res
      let maxPossibleAmountToBuild = Math.min(
        Math.min(
          Math.min(
            startingVillageRes.wood / cost.wood,
            startingVillageRes.clay / cost.clay),
          startingVillageRes.iron / cost.iron),
        startingVillageRes.crop / cost.crop);

      if (!unitToBuild.trainForever) {
        // TODO if no unitCounts then check rally point
        const totalAmount = unitQueue.getQueuedCount(uIndex) + this.m_units.getCount(uIndex);

        maxPossibleAmountToBuild = Math.min(
          maxPossibleAmountToBuild,
          unitToBuild.targetAmount - totalAmount);
      }

      // check crop balance
      maxPossibleAmountToBuild = Math.min(
        maxPossibleAmountToBuild,
        this.m_village.resources.amount.crop >= this.settings().minCrop
          ? Number.MAX_VALUE
          : 0);

      // have res for at least 1
      if (maxPossibleAmountToBuild <= 0) {
        return;
      }

      const { speed } = playerService.get();
      const buildTime = getActualUnitBuildTime(uIndex, speed, unitBuilding.level.actual);

      if (maxAllowedBuildingTime) {
        const freeBuildingTimeToFill = maxAllowedBuildingTime - ongoingBuildingTime;

        // we can ignore this for residence or palace
        maxPossibleAmountToBuild = Math.min(maxPossibleAmountToBuild, Math.floor(freeBuildingTimeToFill / buildTime));
      }

      if (maxPossibleAmountToBuild <= 0) {
        return;
      }

      suitableToBuild[uIndex] = maxPossibleAmountToBuild;
      startingVillageRes = startingVillageRes.subtract(cost.multiply(maxPossibleAmountToBuild));
      ongoingBuildingTime += buildTime * maxPossibleAmountToBuild;
    });

    // can build at least 1 with res and fit in queue
    if (!Object.keys(suitableToBuild).length) {
      return;
    }

    const page = await getPage();

    for (const [uIndex, amount] of Object.entries(suitableToBuild)) {
      logsService.logAutoUnits({
        amount,
        index: +uIndex,
      });

      const input = await page.$(`[name=t${uIndex}]`);

      if (input) {
        await input.type(amount.toString());
      }
    }

    const submitButton = await page.$('[class="green startTraining"]');

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
