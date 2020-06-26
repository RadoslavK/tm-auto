import { BuildingCategory } from '../../../../_enums/buildingCategory';
import { BuildingSpotType } from '../../../../_enums/buildingSpotType';
import { Buildings } from '../../../../_models/buildings';
import { QueuedBuilding } from '../../../../_models/buildings/queue/queuedBuilding';
import { CoolDown } from '../../../../_models/coolDown';
import { Duration } from '../../../../_models/duration';
import { BuildingType } from '../../../../_models/enums/buildingType';
import { Tribe } from '../../../../_models/enums/tribe';
import { Resources } from '../../../../_models/misc/resources';
import { AutoBuildSettings } from '../../../../_models/settings/tasks/autoBuildSettings';
import { Village } from '../../../../_models/village/village';
import {
  ClaimHeroResourcesReason,
  DualQueuePreference,
  TaskType,
} from '../../../../_types/graphql.type';
import { getAccountContext } from '../../../../accountContext';
import { getPage } from '../../../../browser/getPage';
import { fieldIds } from '../../../../constants/fieldIds';
import { parseBuildingsInProgress } from '../../../../parsers/buildings/parseBuildingsInProgress';
import { buildingInfoService } from '../../../../services/info/buildingInfoService';
import { isInfrastructure } from '../../../../utils/buildingUtils';
import { mergeVillageAndHeroResources } from '../../../../utils/mergeVillageAndHeroResources';
import {
  ensureBuildingSpotPage,
  ensurePage,
} from '../../../actions/ensurePage';
import { claimHeroResources } from '../../../actions/hero/claimHeroResources';
import { updateActualResources } from '../../../actions/village/updateResources';
import {
  BotTaskWithCoolDown,
  BotTaskWithCoolDownResult,
} from '../../../taskEngine/botTaskEngine';
import { checkAutoStorage } from './checkAutoStorage';

export class AutoBuildTask implements BotTaskWithCoolDown {
  private readonly _village: Village;

  private readonly _buildings: Buildings;

  private _addedCroplandInQueue = false;

  public readonly type: TaskType = TaskType.AutoBuild;

  constructor(village: Village) {
    this._village = village;
    this._buildings = village.buildings;
  }

  private settings = (): AutoBuildSettings =>
    getAccountContext()
      .settingsService.village(this._village.id)
      .autoBuild.get();

  public allowExecution = (): boolean =>
    getAccountContext().settingsService.account.get().autoBuild &&
    this.settings().allow;

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    const { queue } = this._village.buildings;

    const {
      dualQueue: { allow: allowDualQueue, preference: dualQueuePreference },
      autoStorage,
    } = this.settings();

    const { buildingsToBuild } = await checkAutoStorage(
      this._village,
      autoStorage,
    );

    for (const autoStorageBuilding of buildingsToBuild) {
      await this.startBuildingIfQueueIsFree(
        autoStorageBuilding,
        !!autoStorageBuilding.queueId,
      );
    }

    if (!queue.buildings().length) {
      return;
    }

    const isRoman = getAccountContext().gameInfo.tribe === Tribe.Romans;

    let finishedAt: Date | undefined;
    if (isRoman && allowDualQueue) {
      if (dualQueuePreference === DualQueuePreference.Resources) {
        await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Fields);
        await this.startBuildingIfQueueIsFreeByType(
          BuildingSpotType.Infrastructure,
        );
      } else {
        await this.startBuildingIfQueueIsFreeByType(
          BuildingSpotType.Infrastructure,
        );
        await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Fields);
      }

      const fieldFinishedAt = this._buildings.ongoing.getTimeOfBuildingCompletion(
        BuildingSpotType.Fields,
      );
      const infrastructureFinishedAt = this._buildings.ongoing.getTimeOfBuildingCompletion(
        BuildingSpotType.Infrastructure,
      );

      if (!fieldFinishedAt) {
        finishedAt = infrastructureFinishedAt;
      } else if (!infrastructureFinishedAt) {
        finishedAt = fieldFinishedAt;
      } else {
        finishedAt =
          fieldFinishedAt >= infrastructureFinishedAt
            ? infrastructureFinishedAt
            : fieldFinishedAt;
      }
    } else {
      await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Any);

      finishedAt = this._buildings.ongoing.getTimeOfBuildingCompletion(
        BuildingSpotType.Any,
      );
    }

    // seconds
    const finishedIn =
      finishedAt &&
      Math.max(
        0,
        Math.floor((finishedAt.getTime() - new Date().getTime()) / 1000),
      );

    return {
      nextCoolDown:
        finishedIn === undefined
          ? null
          : CoolDown.fromDuration(Duration.fromSeconds(finishedIn)),
    };
  };

  private startBuildingIfQueueIsFreeByType = async (
    type: BuildingSpotType,
  ): Promise<void> => {
    const isSpotFree = this._buildings.ongoing.isSpotFree(type);

    if (!isSpotFree) {
      return;
    }

    const queuedBuilding = this._buildings.queue.peek(type);

    if (!queuedBuilding) {
      return;
    }

    await this.startBuildingIfQueueIsFree(queuedBuilding);
  };

  private startBuildingIfQueueIsFree = async (
    queuedBuilding: QueuedBuilding,
    isQueued = true,
  ): Promise<void> => {
    const settings = this.settings();
    const { cost } = buildingInfoService.getBuildingLevelInfo(
      queuedBuilding.type,
      queuedBuilding.level,
    );
    const requiredResources = cost.add(
      new Resources({ crop: settings.minCrop }),
    );

    await updateActualResources();

    const currentResources = this._village.resources.amount;
    const { hero } = getAccountContext();
    const totalResources =
      settings.useHeroResources && hero.villageId === this._village.id
        ? mergeVillageAndHeroResources(this._village.id)
        : currentResources;

    if (totalResources.areGreaterOrEqualThan(requiredResources)) {
      if (settings.useHeroResources) {
        const resourcesNeeded = requiredResources.subtract(currentResources);

        if (resourcesNeeded.getTotal() > 0) {
          await claimHeroResources(
            resourcesNeeded,
            ClaimHeroResourcesReason.AutoBuild,
          );
        }
      }

      await this.startBuilding(queuedBuilding, isQueued);
    } else if (
      currentResources.freeCrop < cost.freeCrop &&
      settings.autoCropFields
    ) {
      // need cropland
      const croplandIsCurrentlyBeingBuilt = this._buildings.ongoing
        .buildings()
        .some((b) => b.type === BuildingType.Crop);

      if (croplandIsCurrentlyBeingBuilt || this._addedCroplandInQueue) {
        return;
      }

      getAccountContext().logsService.logText(
        'Not enough free crop. Building crop land next',
        true,
      );

      const [lowestLevelCropLand] = this._buildings.spots
        .buildings()
        .filter((b) => b.type === BuildingType.Crop)
        .sort((b1, b2) => b1.level.actual - b2.level.actual);

      const newCropLandLevel = lowestLevelCropLand.level.actual + 1;

      // ked uz v queue je nejaky tak ho daj na zaciatok
      const inQueueCropLand = this._buildings.queue
        .buildings()
        .find(
          (x) => x.type === BuildingType.Crop && x.level === newCropLandLevel,
        );

      let qBuilding: QueuedBuilding;

      if (inQueueCropLand) {
        // ked je nejaky v queue a zaroven je level <= nez ten co sa prida tak ho dat stavat hned
        qBuilding = inQueueCropLand;
      } else {
        const newCropLandFieldId = lowestLevelCropLand.fieldId;
        qBuilding = new QueuedBuilding({
          fieldId: newCropLandFieldId,
          level: newCropLandLevel,
          type: BuildingType.Crop,
        });
      }

      this._addedCroplandInQueue = true;

      // dost surovin a zaroven prazdna res queue
      const cropLandResourceCost = buildingInfoService.getBuildingLevelInfo(
        BuildingType.Crop,
        newCropLandLevel,
      ).cost;

      if (
        this._village.resources.amount.areLowerThan(cropLandResourceCost) ||
        !this._village.buildings.ongoing.isSpotFree(BuildingSpotType.Fields)
      ) {
        return;
      }

      // !!inQueueCropLand === isQueued
      await this.startBuilding(qBuilding, !!inQueueCropLand);
    }
  };

  private startBuilding = async (
    queuedBuilding: QueuedBuilding,
    isQueued = true,
  ): Promise<void> => {
    getAccountContext().logsService.logAutoBuild(queuedBuilding);

    const page = await getPage();
    await ensureBuildingSpotPage(queuedBuilding.fieldId);
    const { category } = buildingInfoService.getBuildingInfo(
      queuedBuilding.type,
    );

    if (
      queuedBuilding.level === 1 &&
      isInfrastructure(queuedBuilding.fieldId)
    ) {
      //  They have the category but dont have to be selected through category
      const areSpecialCases =
        queuedBuilding.fieldId === fieldIds.RallyPoint ||
        queuedBuilding.fieldId === fieldIds.Wall;

      if (category > BuildingCategory.Infrastructure && !areSpecialCases) {
        // infrastructure is preselected
        const path = `build.php?id=${queuedBuilding.fieldId}&category=${category}`;
        await ensurePage(path);
      }

      const submit = await page.$(
        `.green.new[onclick*="a=${queuedBuilding.type}"]`,
      );

      if (!submit) {
        return;
      }

      await Promise.all([
        submit.click(),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      ]);
    } else {
      const submit = await page.$('.green.build');

      if (!submit) {
        return;
      }

      await Promise.all([
        submit.click(),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      ]);
    }

    if (isQueued) {
      // might be a temporary created object to insta build
      const queueService = getAccountContext().buildingQueueService.for(
        this._village.id,
      );
      queueService.dequeueBuilding(queuedBuilding.queueId, false);
    }

    const ongoing = await parseBuildingsInProgress();
    this._buildings.updateOngoing(ongoing);
    await updateActualResources();
  };
}
