import { BuildingSpotType } from '../../../_enums/BuildingSpotType';
import { BuildingType } from '../../../_enums/BuildingType';
import { TravianPath } from '../../../_enums/TravianPath';
import { Tribe } from '../../../_enums/Tribe';
import { Buildings } from '../../../_models/buildings';
import { QueuedBuilding } from '../../../_models/buildings/queue/queuedBuilding';
import { CoolDown } from '../../../_models/coolDown';
import { Resources } from '../../../_models/misc/resources';
import { AutoBuildSettings } from '../../../_models/settings/tasks/AutoBuildSettings';
import { Village } from '../../../_models/village/village';
import { getPage } from '../../../browser/getPage';
import { buildingInfos } from '../../../bootstrap/loadInfo';
import { parseBuildingsInProgress } from '../../../parsers/buildings/parseBuildingsInProgress';
import { isInfrastructure } from '../../../utils/buildingUtils';
import { randomElement } from '../../../utils/randomElement';
import { ensureBuildingSpotPage, ensurePage } from '../../actions/ensurePage';
import { updateActualResources } from '../../actions/village/updateResources';
import { IBotTask, IBotTaskResultParams } from '../../../_models/tasks';
import { accountContext } from '../../../accountContext';
import { fieldIds } from '../../../constants/fieldIds';
import { Duration } from '../../../_models/duration';

export class AutoBuildTask implements IBotTask {
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

  public execute = async (): Promise<IBotTaskResultParams | void> => {
    const path = randomElement([TravianPath.ResourceFieldsOverview, TravianPath.InfrastructureOverview]);
    await ensurePage(path);

    const ongoing = await parseBuildingsInProgress();
    this.m_buildings.updateOngoing(ongoing);

    const { queue } = this.m_village.buildings;
    if (!queue.buildings().length) {
      return undefined;
    }

    const isRoman = accountContext.gameInfo.tribe === Tribe.Romans;

    let finishedAt: Date | undefined;
    if (isRoman) {
      await this.startBuildingIfQueueIsFree(BuildingSpotType.Fields);
      await this.startBuildingIfQueueIsFree(BuildingSpotType.Infrastructure);

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
      await this.startBuildingIfQueueIsFree(BuildingSpotType.Any);

      finishedAt = this.m_buildings.ongoing.getTimeOfBuildingCompletion(BuildingSpotType.Any);
    }

    // seconds
    const finishedIn = finishedAt && Math.floor(((new Date() as any) - (finishedAt as any)) / 1000);

    return {
      nextCoolDown: finishedIn ? CoolDown.fromDuration(Duration.fromSeconds(finishedIn)) : null,
    };
  };

  private startBuildingIfQueueIsFree = async (type: BuildingSpotType): Promise<void> => {
    const isSpotFree = this.m_buildings.ongoing.isSpotFree(type);

    if (!isSpotFree) {
      return;
    }

    const queuedBuilding = this.m_buildings.queue.peek(type);

    if (!queuedBuilding) {
      return;
    }

    const settings = this.settings();
    const cost = buildingInfos[queuedBuilding.type].costs[queuedBuilding.level];
    const resources = cost.resources.add(new Resources({ crop: settings.minCrop }));

    await updateActualResources();
    const currentResources = this.m_village.resources.amount;

    if (currentResources.isGreaterOrEqualThan(resources)) {
        await this.startBuilding(queuedBuilding);
    } else if (currentResources.freeCrop < cost.resources.freeCrop && settings.autoCropFields) {
      // need cropland
      const croplandIsCurrentlyBeingBuilt = this.m_buildings.ongoing.buildings().some(b => b.type === BuildingType.Crop);

      if (croplandIsCurrentlyBeingBuilt || this.m_addedCroplandInQueue) {
        return;
      }

      accountContext.logsService.logText("Not enough free crop. Building crop land next", true);

      const lowestLevelCropLand = this.m_buildings.spots.buildings()
        .filter(b => b.type === BuildingType.Crop)
        .sort((b1, b2) => b1.level.actual - b2.level.actual)
        [0];

      const newCropLandLevel = lowestLevelCropLand.level.actual + 1;

      // ked uz v queue je nejaky tak ho daj na zaciatok
      const inQueueCropLand = this.m_buildings.queue.buildings().find(x => x.type === BuildingType.Crop && x.level === newCropLandLevel);

      let qBuilding: QueuedBuilding;

      if (inQueueCropLand) {
        // ked je nejaky v queue a zaroven je level <= nez ten co sa prida tak ho iba dat na zaciatok
        this.m_buildings.queue.pushToTheStart(inQueueCropLand);
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
      const cropLandResourceCost = buildingInfos[BuildingType.Crop].costs[newCropLandLevel].resources;

      if (this.m_village.resources.amount.isLowerThan(cropLandResourceCost)
        || !this.m_village.buildings.ongoing.isSpotFree(BuildingSpotType.Fields)) {
        return;
      }

      const isQueued = !!inQueueCropLand;
      await this.startBuilding(qBuilding, isQueued);
    }
  };

  private startBuilding = async (queuedBuilding: QueuedBuilding, isQueued = true): Promise<void> =>{
    accountContext.logsService.logAutoBuild(queuedBuilding);

    const page = await getPage();
    await ensureBuildingSpotPage(queuedBuilding.fieldId);
    const { category } = buildingInfos[queuedBuilding.type];

    //  They have same class but dont have to be selected through category
    const areSpecialCases = queuedBuilding.fieldId === fieldIds.RallyPoint
      || queuedBuilding.fieldId === fieldIds.Wall;

    if ((isInfrastructure(queuedBuilding.fieldId) && queuedBuilding.level === 1 && category > 0) || areSpecialCases) {
      // need to select correct section for new building
      if (category > 1 && !areSpecialCases) {
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
    this.m_buildings.updateOngoing(ongoing);
    await updateActualResources();

    if (isQueued) {
      // might be a temporary created object to insta build
      this.m_buildings.queue.remove(queuedBuilding.queueId);
      this.m_buildings.spots.at(queuedBuilding.fieldId).level.queued--;
    }
  }
}
