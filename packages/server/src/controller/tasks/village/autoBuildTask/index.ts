import { BuildingType } from 'shared/enums/BuildingType.js';
import { VillageTaskType } from 'shared/enums/TaskType.js';
import { Tribe } from 'shared/enums/Tribe.js';

import { BuildingCategory } from '../../../../_enums/buildingCategory.js';
import { BuildingSpotType } from '../../../../_enums/buildingSpotType.js';
import type { Buildings } from '../../../../_models/buildings';
import { QueuedBuilding } from '../../../../_models/buildings/queue/queuedBuilding.js';
import { CoolDown } from '../../../../_models/coolDown.js';
import { Duration } from '../../../../_models/duration.js';
import { ClaimHeroResourcesReason } from '../../../../_models/logs/content/resourceClaim.js';
import { Resources } from '../../../../_models/misc/resources.js';
import type { AutoBuildSettings } from '../../../../_models/settings/tasks/autoBuildSettings';
import type { Village } from '../../../../_models/village/village.js';
import { AccountContext } from '../../../../accountContext.js';
import { getPage } from '../../../../browser/getPage.js';
import { fieldIds } from '../../../../constants/fieldIds.js';
import { parseBuildingsInProgress } from '../../../../parsers/buildings/parseBuildingsInProgress.js';
import { DequeueMode } from '../../../../services/buildingQueueService.js';
import { buildingInfoService } from '../../../../services/info/buildingInfoService.js';
import { isInfrastructure } from '../../../../utils/buildingUtils.js';
import { mergeVillageAndHeroResources } from '../../../../utils/mergeVillageAndHeroResources.js';
import {
  ensureBuildingSpotPage,
  ensurePage,
} from '../../../actions/ensurePage.js';
import { claimHeroResources } from '../../../actions/hero/claimHeroResources.js';
import { updateActualResources } from '../../../actions/village/updateResources.js';
import type {
  BotTaskWithCoolDownResult,
  VillageBotTaskWithCoolDown,
} from '../../../taskEngine/botTaskEngine.js';
import { checkAutoStorage } from './checkAutoStorage.js';
import { useVideoFeature } from './useVideoFeature.js';

const pickLowestDate = (...dates: ReadonlyArray<Date | undefined | void>): Date | undefined | void =>
  dates
    .filter(date => !!date)
    .sort((date1, date2) => +date2! - +date1!)
    .reverse()
    [0];

const parseDemolitionTimer = async (): Promise<Duration | null> => {
  const page = await getPage();
  const timerNode = await page.$('#demolish tbody tr .timer');

  if (!timerNode) {
    return null;
  }

  const secondsText = await page.evaluate((timer: HTMLElement) => timer.getAttribute('value'), timerNode);

  if (!secondsText) {
    throw new Error('Failed to parse timer value');
  }

  return Duration.fromSeconds(+secondsText);
};

export class AutoBuildTask implements VillageBotTaskWithCoolDown {
  private readonly _village: Village;

  private readonly _buildings: Buildings;

  private _addedCroplandInQueue = false;

  public readonly type: VillageTaskType = VillageTaskType.AutoBuild;

  constructor(village: Village) {
    this._village = village;
    this._buildings = village.buildings;
  }

  private settings = (): AutoBuildSettings =>
    AccountContext.getContext()
      .settingsService.village(this._village.id)
      .autoBuild.get();

  public allowExecution = (): boolean => {
    const { allow, autoStorage, buildingsDemolition } = this.settings();
    const { queue } = this._village.buildings;

    return AccountContext.getContext().settingsService.account.get().autoBuild.allow
      && allow
      //  Allow even if nothing is queued because maybe something is overflowing
      //  TODO have extra task for overflow and do it before this one
      && (!!queue.buildings().length || autoStorage.warehouse.allow || autoStorage.granary.allow || !!buildingsDemolition.length);
  };

  public coolDown = (): CoolDown => this.settings().coolDown;

  private demolishBuilding = async (): Promise<Duration | null> => {
    const { spots } = this._village.buildings;
    const mb = spots.ofType(BuildingType.MainBuilding);

    //  remove target levels if its already lower
    const { buildingsDemolition } = this.settings();
    let buildingsDemolitionUpdated = buildingsDemolition.filter(b => {
      const building = spots.at(b.fieldId);

      return !(
        !building || building.type !== b.type || building.level.actual <= b.targetLevel
      );
    });

    if (buildingsDemolitionUpdated.length !== buildingsDemolition.length) {
      AccountContext.getContext().settingsService.village(this._village.id).autoBuild.merge({ buildingsDemolition: buildingsDemolitionUpdated });
    }

    if (!buildingsDemolitionUpdated.length || !mb || mb.level.actual < 10) {
      return null;
    }

    await ensureBuildingSpotPage(mb.fieldId);

    let timer = await parseDemolitionTimer();

    if (timer) {
      return timer;
    }

    const page = await getPage();

    const demolishNodes = await page.$$eval('#demolish option', x => x.map(e => {
      const value = +(e.getAttribute('value') ?? 0);
      const buildingName = new RegExp(`${value} (.*) \\d+`).exec(e.textContent ?? '')?.[1];

      return {
        fieldId: value,
        name: buildingName,
      };
    }));

    const buildingToDemolish = buildingsDemolitionUpdated[0];
    const demolishNode = demolishNodes.find(n => {
      return n.fieldId === buildingToDemolish.fieldId
        && n.name === BuildingType[buildingToDemolish.type];
    });

    if (!demolishNode) {
      throw new Error('Did not find demolish node');
    }

    await page.select('#demolish', buildingToDemolish.fieldId.toString());

    const buildingInfo = buildingInfoService.getBuildingInfo(buildingToDemolish.type);
    const actualBuilding = spots.at(buildingToDemolish.fieldId);
    AccountContext.getContext().logsService.logText(`Demolishing building ${buildingInfo.name} from level ${actualBuilding.level.actual}`);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click('#btn_demolish'),
    ]);

    timer = await parseDemolitionTimer();

    if (!timer) {
      throw new Error('Does not have demolition timer after action');
    }

    return timer;
  };

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    this._addedCroplandInQueue = false;
    const { queue } = this._village.buildings;

    const {
      dualQueue: { allow: allowDualQueue, preference: dualQueuePreference },
      autoStorage,
    } = this.settings();

    const demolitionTimer = await this.demolishBuilding();

    if (autoStorage.granary.allow || autoStorage.warehouse.allow) {
      const { buildingsToBuild } = await checkAutoStorage(
        this._village,
        autoStorage,
      );

      for (const autoStorageBuilding of buildingsToBuild) {
        await this.startBuildingIfQueueIsFree(
          autoStorageBuilding,
          !!autoStorageBuilding.id,
        );
      }
    }

    if (!queue.buildings().length) {
      return {
        nextCoolDown: demolitionTimer && CoolDown.fromDuration(demolitionTimer),
      };
    }

    const isRoman = this._village.tribe === Tribe.Romans;

    let finishedAt: Date | undefined | void;
    let enoughResourcesAt: Date | void;

    if (isRoman && allowDualQueue) {
      let enoughResourcesForResAt: Date | void;
      let enoughResourcesForInfAt: Date | void;

      if (dualQueuePreference === 'Resources') {
        enoughResourcesForResAt = await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Fields);
        enoughResourcesForInfAt = await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Infrastructure);
      } else {
        enoughResourcesForInfAt = await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Infrastructure);
        enoughResourcesForResAt = await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Fields);
      }

      enoughResourcesAt = pickLowestDate(enoughResourcesForResAt, enoughResourcesForInfAt);

      const fieldFinishedAt = this._buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Fields);
      const infrastructureFinishedAt = this._buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Infrastructure);
      finishedAt = pickLowestDate(fieldFinishedAt, infrastructureFinishedAt);
    } else {
      enoughResourcesAt = await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Any);
      finishedAt = this._buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Any);
    }

    let demolitionFinishAt: Date | undefined;

    if (demolitionTimer) {
      demolitionFinishAt = new Date();
      demolitionFinishAt.setSeconds(demolitionFinishAt.getSeconds() + demolitionTimer.getTotalSeconds());
    }

    const lowestWaiting = pickLowestDate(enoughResourcesAt, finishedAt, demolitionFinishAt);

    // seconds
    const finishedIn =
      lowestWaiting &&
      Math.max(
        0,
        Math.floor((lowestWaiting.getTime() - new Date().getTime()) / 1000),
      );

    return {
      nextCoolDown:
        finishedIn === undefined
          ? null
          : CoolDown.fromDuration(Duration.fromSeconds(finishedIn)),
    };
  };

  //  Returns date of having enough resources
  private startBuildingIfQueueIsFreeByType = async (
    type: BuildingSpotType,
  ): Promise<Date | void> => {
    const isSpotFree = this._buildings.ongoing.isSpotFree(type);

    if (!isSpotFree) {
      return;
    }

    let queuedBuilding = this._buildings.queue.peek(type);

    if (!queuedBuilding) {
      return;
    }

    if (queuedBuilding.startingLevel === 1
      && [BuildingType.GrainMill, BuildingType.Bakery, BuildingType.Sawmill, BuildingType.Brickyard, BuildingType.IronFoundry].includes(queuedBuilding.type)) {
      // Used for Roman Dual Queue. If its resource enhancing infrastructure building, then it should meet prerequisites because fields might not have been built yet
      const meetsRequirements = AccountContext.getContext().buildingQueueService.for(this._village.id).willQueuedBuildingStillMeetItsRequirements({
        checkedBuilding: queuedBuilding,
        ignoreOngoing: true,
      });

      if (!meetsRequirements) {
        queuedBuilding = this._buildings.queue.peekNextBuilding(queuedBuilding, type);

        if (!queuedBuilding) {
          return;
        }
      }
    }

    return this.startBuildingIfQueueIsFree(queuedBuilding);
  };

  //  Returns date of having enough resources
  private startBuildingIfQueueIsFree = async (
    queuedBuilding: QueuedBuilding,
    isQueued = true,
  ): Promise<Date | void> => {
    const settings = this.settings();
    const { cost } = buildingInfoService.getBuildingLevelInfo(
      queuedBuilding.type,
      queuedBuilding.startingLevel,
    );
    const requiredResources = cost.add(
      new Resources({ crop: settings.minCrop }),
    );

    await updateActualResources();

    const currentResources = this._village.resources.amount;
    const totalResources =
      settings.useHeroResources
        ? mergeVillageAndHeroResources(this._village.id)
        : currentResources;

    if (totalResources.isGreaterOrEqualThan(requiredResources)) {
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

      AccountContext.getContext().logsService.logText(
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
          (x) => x.type === BuildingType.Crop && x.startingLevel === newCropLandLevel,
        );

      let qBuilding: QueuedBuilding;

      if (inQueueCropLand) {
        // ked je nejaky v queue a zaroven je level <= nez ten co sa prida tak ho dat stavat hned
        qBuilding = inQueueCropLand;
      } else {
        const newCropLandFieldId = lowestLevelCropLand.fieldId;
        qBuilding = new QueuedBuilding({
          fieldId: newCropLandFieldId,
          startingLevel: newCropLandLevel,
          targetLevel: newCropLandFieldId,
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
        totalResources.isLowerThan(cropLandResourceCost) ||
        !this._village.buildings.ongoing.isSpotFree(BuildingSpotType.Fields)
      ) {
        return;
      }

      if (settings.useHeroResources) {
        const resourcesNeeded = cropLandResourceCost.subtract(currentResources);

        if (resourcesNeeded.getTotal() > 0) {
          await claimHeroResources(
            resourcesNeeded,
            ClaimHeroResourcesReason.AutoBuild,
          );
        }
      }

      // !!inQueueCropLand === isQueued
      await this.startBuilding(qBuilding, !!inQueueCropLand);
    } else {
      const neededResources = requiredResources.subtract(totalResources);

      if (!neededResources.getTotal()) {
        //  In case crop was problem
        return;
      }

      const { production } = this._village.resources;
      const woodIn = neededResources.wood / production.wood;
      const clayIn = neededResources.clay / production.clay;
      const ironIn = neededResources.iron / production.iron;
      const cropIn = neededResources.crop / production.crop;

      //  hours
      const availableIn = Math.max(woodIn, clayIn, ironIn, cropIn);
      const date = new Date();

      date.setSeconds(availableIn * 60 * 60);

      return date;
    }
  };

  private startBuilding = async (
    queuedBuilding: QueuedBuilding,
    isQueued = true,
  ): Promise<void> => {
    const page = await getPage();
    await ensureBuildingSpotPage(queuedBuilding.fieldId);
    const { category } = buildingInfoService.getBuildingInfo(
      queuedBuilding.type,
    );

    if (
      queuedBuilding.startingLevel === 1 &&
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

      AccountContext.getContext().logsService.logAutoBuild(queuedBuilding);

      await Promise.all([
        submit.click(),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      ]);
    } else {
      const buildTimeText = await page.$eval('.duration', (x) => x.textContent?.trim());
      const buildTime = buildTimeText && Duration.fromText(buildTimeText);

      const videoFeatureSettings = AccountContext.getContext().settingsService.account.get().autoBuild.videoFeature;
      const usedVideoFeature = videoFeatureSettings.allow
        && queuedBuilding.startingLevel !== 1
        && queuedBuilding.type !== BuildingType.Residence
        && queuedBuilding.type !== BuildingType.Palace
        && buildTime
        && buildTime.getTotalSeconds() >= videoFeatureSettings.minBuildTime.getTotalSeconds()
        ? await useVideoFeature()
        : false;

      if (!usedVideoFeature) {
        const submit = await page.$('.green.build');

        if (!submit) {
          return;
        }

        AccountContext.getContext().logsService.logAutoBuild(queuedBuilding);

        await Promise.all([
          submit.click(),
          page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        ]);
      } else {
        AccountContext.getContext().logsService.logAutoBuild(queuedBuilding);
      }
    }

    if (isQueued) {
      // might be a temporary created object to insta build
      const queueService = AccountContext.getContext().buildingQueueService.for(
        this._village.id,
      );
      queueService.dequeueBuilding({
        queueId: queuedBuilding.id,
        mode: DequeueMode.AutomaticLastLevel,
      });
    }

    const ongoing = await parseBuildingsInProgress();
    await this._buildings.update({ ongoing });
    await updateActualResources();
  };
}
