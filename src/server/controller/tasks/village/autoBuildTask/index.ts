import { BuildingType } from '../../../../../_shared/types/buildingType';
import { Tribe } from '../../../../../_shared/types/tribe';
import { BuildingCategory } from '../../../../_enums/buildingCategory';
import { BuildingSpotType } from '../../../../_enums/buildingSpotType';
import { Buildings } from '../../../../_models/buildings';
import { QueuedBuilding } from '../../../../_models/buildings/queue/queuedBuilding';
import { CoolDown } from '../../../../_models/coolDown';
import { Duration } from '../../../../_models/duration';
import { Resources } from '../../../../_models/misc/resources';
import { AutoBuildSettings } from '../../../../_models/settings/tasks/autoBuildSettings';
import { Village } from '../../../../_models/village/village';
import { VillageTaskType } from '../../../../_types/graphql';
import { accountContext } from '../../../../accountContext';
import { getPage } from '../../../../browser/getPage';
import { fieldIds } from '../../../../constants/fieldIds';
import { parseBuildingsInProgress } from '../../../../parsers/buildings/parseBuildingsInProgress';
import { buildingInfoService } from '../../../../services/info/buildingInfoService';
import { isInfrastructure } from '../../../../utils/buildingUtils';
import {
  ensureBuildingSpotPage,
  ensurePage,
} from '../../../actions/ensurePage';
import { updateActualResources } from '../../../actions/village/updateResources';
import {
  BotTaskResult,
  IVillageBotTask,
} from '../../_types';
import { checkAutoStorage } from './checkAutoStorage';

export class AutoBuildTask implements IVillageBotTask {
  public readonly type: VillageTaskType = VillageTaskType.AutoBuild;

  private readonly m_village: Village;
  private readonly m_buildings: Buildings;

  private m_addedCroplandInQueue = false;

  constructor(village: Village) {
    this.m_village = village;
    this.m_buildings = village.buildings;
  }

  private settings = (): AutoBuildSettings => accountContext.settingsService.village(this.m_village.id).autoBuild.get();

  public allowExecution = (): boolean => accountContext.settingsService.general.get().autoBuild
    && this.settings().allow;

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): BotTaskResult => {
    const { queue } = this.m_village.buildings;

    const { buildingsToBuild } = await checkAutoStorage(this.m_village, this.settings().autoStorage);

    for (const autoStorageBuilding of buildingsToBuild) {
      await this.startBuildingIfQueueIsFree(autoStorageBuilding, !!autoStorageBuilding.queueId);
    }

    if (!queue.buildings().length) {
      return undefined;
    }

    const isRoman = accountContext.gameInfo.tribe === Tribe.Romans;

    let finishedAt: Date | undefined;
    if (isRoman) {
      await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Fields);
      await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Infrastructure);

      const fieldFinishedAt = this.m_buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Fields);
      const infrastructureFinishedAt = this.m_buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Infrastructure);

      if (!fieldFinishedAt) {
        finishedAt = infrastructureFinishedAt;
      } else if (!infrastructureFinishedAt) {
        finishedAt = fieldFinishedAt;
      } else {
        finishedAt = fieldFinishedAt >= infrastructureFinishedAt ? fieldFinishedAt : infrastructureFinishedAt;
      }
    } else {
      await this.startBuildingIfQueueIsFreeByType(BuildingSpotType.Any);

      finishedAt = this.m_buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Any);
    }

    // seconds
    const finishedIn = finishedAt && Math.max(0, Math.floor(((finishedAt as any) - (new Date() as any)) / 1000));

    return {
      nextCoolDown: finishedIn === undefined ? null : CoolDown.fromDuration(Duration.fromSeconds(finishedIn)),
    };
  };

  private startBuildingIfQueueIsFreeByType = async (type: BuildingSpotType): Promise<void> => {
    const isSpotFree = this.m_buildings.ongoing.isSpotFree(type);

    if (!isSpotFree) {
      return;
    }

    const queuedBuilding = this.m_buildings.queue.peek(type);

    if (!queuedBuilding) {
      return;
    }

    await this.startBuildingIfQueueIsFree(queuedBuilding);
  };

  private startBuildingIfQueueIsFree = async (queuedBuilding: QueuedBuilding, isQueued = true): Promise<void> => {
    const settings = this.settings();
    const cost = buildingInfoService.getBuildingInfo(queuedBuilding.type).costs[queuedBuilding.level];
    const resources = cost.resources.add(new Resources({ crop: settings.minCrop }));

    await updateActualResources();
    const currentResources = this.m_village.resources.amount;

    if (currentResources.isGreaterOrEqualThan(resources)) {
      await this.startBuilding(queuedBuilding, isQueued);
    } else if (currentResources.freeCrop < cost.resources.freeCrop && settings.autoCropFields) {
      // need cropland
      const croplandIsCurrentlyBeingBuilt = this.m_buildings.ongoing.buildings().some(b => b.type === BuildingType.Crop);

      if (croplandIsCurrentlyBeingBuilt || this.m_addedCroplandInQueue) {
        return;
      }

      accountContext.logsService.logText('Not enough free crop. Building crop land next', true);

      const lowestLevelCropLand = this.m_buildings.spots.buildings()
        .filter(b => b.type === BuildingType.Crop)
        .sort((b1, b2) => b1.level.actual - b2.level.actual)
        [0];

      const newCropLandLevel = lowestLevelCropLand.level.actual + 1;

      // ked uz v queue je nejaky tak ho daj na zaciatok
      const inQueueCropLand = this.m_buildings.queue.buildings().find(x => x.type === BuildingType.Crop && x.level === newCropLandLevel);

      let qBuilding: QueuedBuilding;

      if (inQueueCropLand) {
        // ked je nejaky v queue a zaroven je level <= nez ten co sa prida tak ho dat stavat hned
        qBuilding = inQueueCropLand;
      } else {
        const newCropLandFieldId = lowestLevelCropLand.fieldId;
        qBuilding = new QueuedBuilding({
          fieldId: newCropLandFieldId,
          type: BuildingType.Crop,
          level: newCropLandLevel,
        });
      }

      this.m_addedCroplandInQueue = true;

      // dost surovin a zaroven prazdna res queue
      const cropLandResourceCost = buildingInfoService.getBuildingInfo(BuildingType.Crop).costs[newCropLandLevel].resources;

      if (this.m_village.resources.amount.isLowerThan(cropLandResourceCost)
        || !this.m_village.buildings.ongoing.isSpotFree(BuildingSpotType.Fields)) {
        return;
      }

      // !!inQueueCropLand === isQueued
      await this.startBuilding(qBuilding, !!inQueueCropLand);
    }
  };

  private startBuilding = async (queuedBuilding: QueuedBuilding, isQueued = true): Promise<void> =>{
    accountContext.logsService.logAutoBuild(queuedBuilding);

    const page = await getPage();
    await ensureBuildingSpotPage(queuedBuilding.fieldId);
    const { category } = buildingInfoService.getBuildingInfo(queuedBuilding.type);

    if (queuedBuilding.level === 1 && isInfrastructure(queuedBuilding.fieldId)) {
      //  They have the category but dont have to be selected through category
      const areSpecialCases = queuedBuilding.fieldId === fieldIds.RallyPoint
        || queuedBuilding.fieldId === fieldIds.Wall;

      if (category > BuildingCategory.Infrastructure && !areSpecialCases) {
        // infrastructure is preselected
        const path = `build.php?id=${queuedBuilding.fieldId}&category=${category}`;
        await ensurePage(path);
      }

      const submit = await page.$(`.green.new[onclick*="a=${queuedBuilding.type}"]`);

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

    const ongoing = await parseBuildingsInProgress();
    this.m_buildings.updateOngoing(ongoing);
    await updateActualResources();

    if (isQueued) {
      // might be a temporary created object to insta build
      this.m_buildings.queue.remove(queuedBuilding.queueId);
      this.m_buildings.spots.at(queuedBuilding.fieldId).level.queued--;
    }
  }
}
