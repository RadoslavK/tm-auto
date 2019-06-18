import { BuildingType } from '../../_enums/BuildingType';
import { AutoUnitsSettings } from '../../_models/settings/tasks/AutoUnitsSettings';
import { Units } from '../../_models/units';
import { Village } from '../../_models/village/village';
import { getPage } from '../../browser/getPage';
import { context } from '../../graphql/context';
import { unitInfos } from '../../index';
import { parseUnitQueue } from '../../parsers/units/parseUnitQueue';
import { getActualUnitBuildTime } from '../../utils/buildTimeUtils';
import { ensureBuildingSpotPage } from '../actions/ensurePage';
import { updateActualResources } from '../actions/village/updateResources';
import { IBotTask } from './taskManager';

export class AutoUnitsTask implements IBotTask {
  private readonly _village: Village;
  private readonly _units: Units;

  constructor(village: Village) {
    this._village = village;
    this._units = village.units;
  }

  public settings = (): AutoUnitsSettings => context.settings.village(this._village.id).autoUnits;

  public execute = async (): Promise<void> => {
    await this._analyzeQueueAndBuildUnits(BuildingType.Barracks);
    await this._analyzeQueueAndBuildUnits(BuildingType.Stable);
    await this._analyzeQueueAndBuildUnits(BuildingType.Workshop);
    await this._analyzeQueueAndBuildUnits(BuildingType.Residence);
    await this._analyzeQueueAndBuildUnits(BuildingType.Palace);
  };

  private _analyzeQueueAndBuildUnits = async (type: BuildingType): Promise<void> => {
    const settings = this.settings().forBuilding(type);
    const unitsToBuild = settings.units;

    const possibleUnitsToBuild = unitsToBuild.filter(unit => unit.autoBuild);
    const buildingSpots = this._village.buildings.spots;
    const isUnitBuildingBuilt = buildingSpots.isBuilt(type);

    if (!possibleUnitsToBuild.length
      || !isUnitBuildingBuilt) {
      return;
    }

    const unitBuilding = buildingSpots.ofType(type);
    // select appropriate building
    await ensureBuildingSpotPage(unitBuilding.fieldId);
    await updateActualResources();

    const unitQueue = await parseUnitQueue();
    this._units.setQueue(type, unitQueue);

    const suitableToBuild: Record<number, number> = {};
    let startingVillageRes = this._village.resources.amount;

    const maxAllowedBuildingTime = settings.maxBuildTime;
    let ongoingBuildingTime = unitQueue.duration;

    for (let i = 0; i < possibleUnitsToBuild.length; i++) {
      const unitToBuild = possibleUnitsToBuild[i];
      const uIndex = unitToBuild.index;
      const cost = unitInfos[uIndex].cost.resources;

      //max by res
      let maxPossibleAmountToBuild = Math.min(
        Math.min(
          Math.min(
            startingVillageRes.wood / cost.wood,
            startingVillageRes.clay / cost.clay),
          startingVillageRes.iron / cost.iron),
        startingVillageRes.crop / cost.crop);

      if (!unitToBuild.trainForever) {
        //TODO if no unitCounts then check rally point
        const totalAmount = unitQueue.getQueuedCount(uIndex) + this._units.getCount(uIndex);

        maxPossibleAmountToBuild = Math.min(
          maxPossibleAmountToBuild,
          unitToBuild.targetAmount - totalAmount);
      }

      //check crop balance
      maxPossibleAmountToBuild = Math.min(
        maxPossibleAmountToBuild,
        this._village.resources.amount.crop >= this.settings().minCrop
          ? Number.MAX_VALUE
          : 0);

      //have res for at least 1
      if (maxPossibleAmountToBuild <= 0) {
        continue;
      }

      const speed = context.player.speed;
      const buildTime = getActualUnitBuildTime(uIndex, speed, unitBuilding.level.actual);

      if (type !== BuildingType.Residence
        && type !== BuildingType.Palace) {
        const freeBuildingTimeToFill = maxAllowedBuildingTime - ongoingBuildingTime;

        // we can ignore this for residence or palace
        maxPossibleAmountToBuild = Math.min(maxPossibleAmountToBuild, Math.floor(freeBuildingTimeToFill / buildTime));
      }

      if (maxPossibleAmountToBuild <= 0) {
        continue;
      }

      suitableToBuild[uIndex] = maxPossibleAmountToBuild;
      startingVillageRes = startingVillageRes.subtract(cost.multiply(maxPossibleAmountToBuild));
      ongoingBuildingTime += buildTime * maxPossibleAmountToBuild;
    }

    //can build at least 1 with res and fit in queue
    if (!Object.keys(suitableToBuild).length) {
      return;
    }

    const page = await getPage();

    for (const uIndex of Object.keys(suitableToBuild)) {
      const amount = suitableToBuild[uIndex];

      const input = await page.$(`[name=t${uIndex}]`);
      await input.type(amount.toString());
    }

    const submitButton = await page.$('[class="green startTraining"]');

    await Promise.all([
      submitButton.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    await updateActualResources();
  };
}
