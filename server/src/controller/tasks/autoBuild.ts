import { BuildingSpotType } from '../../_enums/BuildingSpotType';
import { BuildingType } from '../../_enums/BuildingType';
import { TravianPath } from '../../_enums/TravianPath';
import { Tribe } from '../../_enums/Tribe';
import { Buildings } from '../../_models/buildings';
import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding';
import { Resources } from '../../_models/misc/resources';
import { Village } from '../../_models/village/village';
import { getPage } from '../../browser/getPage';
import { context } from '../../graphql/context';
import { buildingInfos, getBuildingCategory } from '../../index';
import { parseBuildingsInProgress } from '../../parsers/buildings/parseBuildingsInProgress';
import { log } from '../../utils/log';
import { randomElement } from '../../utils/randomElement';
import { isInfrastructure } from '../actions/build/startBuilding';
import { ensureBuildingSpotPage, ensurePage } from '../actions/ensurePage';
import { updateActualResources } from '../actions/village/updateResources';

interface IAutoBuildSettings {
  readonly autoCropFields: boolean;
  readonly minCrop: number;
}

export class AutoBuild {
  private readonly _village: Village;
  private readonly _buildings: Buildings;

  private _addedCroplandInQueue: boolean = false;

  constructor(village: Village) {
    this._village = village;
    this._buildings = village.buildings;
  }

  public execute = async (): Promise<void> => {
    const path = randomElement([TravianPath.ResourceFieldsOverview, TravianPath.InfrastructureOverview]);
    await ensurePage(path);

    const ongoing = await parseBuildingsInProgress();
    this._buildings.updateOngoing(ongoing);

    const queue = this._village.buildings.queue;
    if (!queue.buildings().length) {
      return;
    }

    const isRoman = context.player.tribe === Tribe.Romans;

    let finishedAt: Date | undefined;
    if (isRoman) {
      await this._startBuildingIfQueueIsFree(BuildingSpotType.Fields);
      await this._startBuildingIfQueueIsFree(BuildingSpotType.Infrastructure);

      const fieldFinishedAt = this._buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Fields);
      const infrastructureFinishedAt = this._buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Infrastructure);

      if (!fieldFinishedAt) {
        finishedAt = infrastructureFinishedAt;
      } else if (!infrastructureFinishedAt) {
        finishedAt = fieldFinishedAt;
      } else {
        finishedAt = (fieldFinishedAt.valueOf() - infrastructureFinishedAt.valueOf()) > 0
          ? infrastructureFinishedAt
          : fieldFinishedAt;
      }
    } else {
      await this._startBuildingIfQueueIsFree(BuildingSpotType.Any);

      finishedAt = this._buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Any);
    }

    //  TODO set cooldown
  };

  private   _startBuildingIfQueueIsFree = async (type: BuildingSpotType): Promise<void> => {
    const isSpotFree = this._buildings.ongoing.isSpotFree(type);

    if (!isSpotFree) {
      return;
    }

    const queuedBuilding = this._buildings.queue.peek(type);

    if (!queuedBuilding) {
      return;
    }

    //  TODO: load!
    const settings: IAutoBuildSettings = {
      autoCropFields: false,
      minCrop: 0,
    };

    const cost = buildingInfos[queuedBuilding.type][queuedBuilding.level - 1].cost;
    const resources = cost.resources;
    resources.add(new Resources({ crop: settings.minCrop }));

    await updateActualResources();
    const currentResources = this._village.resources.amount;

    if (currentResources.isGreaterOrEqualThan(resources)) {
        await this.startBuilding(queuedBuilding);
    } else if (currentResources.freeCrop < cost.resources.freeCrop && settings.autoCropFields) {
      // need cropland
      const croplandIsCurrentlyBeingBuilt = this._buildings.ongoing.buildings().some(b => b.type === BuildingType.Crop);

      if (croplandIsCurrentlyBeingBuilt || this._addedCroplandInQueue) {
        return;
      }

      log("Not enough free crop. Building crop land next");

      const lowestLevelCropLand = Object.values(this._buildings.spots)
        .filter(b => b.type === BuildingType.Crop)
        .sort((b1, b2) => b1.level.actual - b2.level.actual)
        [0];

      const newCropLandLevel = lowestLevelCropLand.level.actual + 1;

      //ked uz v queue je nejaky tak ho daj na zaciatok
      const inQueueCropLand = this._buildings.queue.buildings().find(x => x.type === BuildingType.Crop && x.level === newCropLandLevel);

      let qBuilding: QueuedBuilding;
      let isQueued = !!inQueueCropLand;

      if (isQueued) {
        //ked je nejaky v queue a zaroven je level <= nez ten co sa prida tak ho iba dat na zaciatok
        this._buildings.queue.pushToTheStart(inQueueCropLand);
        qBuilding = inQueueCropLand;
      } else {
        const newCropLandFieldId = lowestLevelCropLand.fieldId;
        qBuilding = new QueuedBuilding({
          fieldId: newCropLandFieldId,
          type: BuildingType.Crop,
          level: newCropLandLevel,
        });
      }

      this._addedCroplandInQueue = true;

      //dost surovin a zaroven prazdna res queue
      const cropLandResourceCost = buildingInfos[BuildingType.Crop][newCropLandLevel - 1].cost.resources;

      if (this._village.resources.amount.isLowerThan(cropLandResourceCost)
        || !this._village.buildings.ongoing.isSpotFree(BuildingSpotType.Fields)) {
        return;
      }

      await this.startBuilding(qBuilding, isQueued);
    }
  };

  private startBuilding = async (queuedBuilding: QueuedBuilding, isQueued: boolean = true): Promise<void> =>{
    const page = await getPage();
    await ensureBuildingSpotPage(queuedBuilding.fieldId);
    const category = getBuildingCategory(queuedBuilding.type);

    if (isInfrastructure(queuedBuilding.fieldId) && queuedBuilding.level === 1 && category > 0) {
      // need to select correct section for new building
      if (category > 1) {
        // category 1 is preselected
        const path = `build.php?id=${queuedBuilding.fieldId}&category=${category}`;
        await ensurePage(path);
      }

      const submit = await page.$(`[class="green new"][onclick*="a=${queuedBuilding.type}"]`);

      if (!submit) {
        return;
      }

      await Promise.all([
        submit.click(),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      ]);
    } else {
      const submit = await page.$('[class="green build"]');

      if (!submit) {
        return;
      }

      await Promise.all([
        submit.click(),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      ]);
    }

    const ongoing = await parseBuildingsInProgress();
    this._buildings.updateOngoing(ongoing);
    await updateActualResources();

    if (isQueued) {
      // might be a temporary created object to insta build
      this._buildings.queue.remove(queuedBuilding.queueId);
      this._buildings.spots[queuedBuilding.fieldId].level.queued--;
    }
  }
}
