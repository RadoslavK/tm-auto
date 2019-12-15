import { BuildingSpotType } from '../../../../_enums/buildingSpotType';
import { QueuedBuilding } from '../../../../_models/buildings/queue/queuedBuilding';
import { Village } from '../../../../_models/village/village';
import { IAutoStorageSettings } from '../../../../_types/graphql';
import { BuildingType } from '../../../../../_shared/types/buildingType';
import { Tribe } from '../../../../../_shared/types/tribe';
import { accountContext } from '../../../../accountContext';
import { buildingInfoService } from '../../../../services/info/buildingInfoService';
import {
  getWithMinimum,
  getWithMinimumSafe,
} from '../../../../utils/getWithMaximum';
import { randomElement } from '../../../../utils/randomElement';

interface IResult {
  readonly buildingsToBuild: readonly QueuedBuilding[];
}

export const checkAutoStorage = async (village: Village, settings: IAutoStorageSettings): Promise<IResult> => {
  const buildingsToBuild: QueuedBuilding[] = [];

  let nextTaskHighestWarehouseCost = 0;
  let nextTaskHighestGranaryCost = 0;

  // Check if next building exceeds Granary/Warehouse capacity

  if (accountContext.gameInfo.tribe === Tribe.Romans) {
    const resourceField = village.buildings.queue.peek(BuildingSpotType.Fields);

    if (resourceField) {
      const resourcesNeeded = buildingInfoService.getBuildingInfo(resourceField.type).costs[resourceField.level].resources;

      nextTaskHighestWarehouseCost = resourcesNeeded.maxWarehouseRes();
      nextTaskHighestGranaryCost = resourcesNeeded.crop;
    }

    const infrastructureField = village.buildings.queue.peek(BuildingSpotType.Infrastructure);

    if (infrastructureField) {
      const resourcesNeeded = buildingInfoService.getBuildingInfo(infrastructureField.type).costs[infrastructureField.level].resources;

      nextTaskHighestWarehouseCost = Math.max(nextTaskHighestWarehouseCost, resourcesNeeded.maxWarehouseRes());
      nextTaskHighestGranaryCost = Math.max(nextTaskHighestGranaryCost, resourcesNeeded.crop);
    }
  } else {
    const building = village.buildings.queue.peek(BuildingSpotType.Any);

    if (building) {
      const resourcesNeeded = buildingInfoService.getBuildingInfo(building.type).costs[building.level].resources;
      nextTaskHighestWarehouseCost = resourcesNeeded.maxWarehouseRes();
      nextTaskHighestGranaryCost = resourcesNeeded.crop;
    }
  }

  const nextTaskExceedsWarehouseCapacity = nextTaskHighestWarehouseCost > village.resources.capacity.warehouse;
  const nextTaskExceedsGranaryCapacity = nextTaskHighestGranaryCost > village.resources.capacity.granary;

  // End check

  const neededBuildings: BuildingType[] = [];

  if (settings.warehouse.allow
    && (village.resources.warehouseFullness() >= settings.warehouse.overflowLevel
      || nextTaskExceedsWarehouseCapacity)
  ) {
    neededBuildings.push(BuildingType.Warehouse);
  }

  if (settings.granary.allow
    && (village.resources.granaryFullness() >= settings.granary.overflowLevel
      || nextTaskExceedsGranaryCapacity)
  ) {
    neededBuildings.push(BuildingType.Granary);
  }

  for (const neededBuildingType of neededBuildings) {
    const isBeingBuilt = village.buildings.ongoing.buildings().some(b => b.type === neededBuildingType);

    if (isBeingBuilt) {
      continue;
    }

    //  get queued building with lowest level
    const qBuilding = getWithMinimumSafe(
      village.buildings.queue.buildings().filter(b => b.fieldId === neededBuildingType),
      b => b.level,
    );

    const lowestLevelBuildingInVillage = getWithMinimum(
      village
        .buildings
        .normalizedBuildingSpots()
        .filter(b => b.type === neededBuildingType && b.level.actual !== b.level.max),
      b => b.level.actual,
    );

    const levelOfLowestLevelBuildingInVillage = lowestLevelBuildingInVillage
      ? lowestLevelBuildingInVillage.level.actual + lowestLevelBuildingInVillage.level.ongoing
      : 0;

    if (qBuilding && qBuilding.level === levelOfLowestLevelBuildingInVillage + 1) {
      // is already in queue and equal to minimum next level, so build that one
      buildingsToBuild.push(qBuilding);
    } else if (lowestLevelBuildingInVillage) {
      // exists and not max level
      const queuedBuilding = new QueuedBuilding({
        //  id is not important is it wont be placed into the queue
        queueId: '',
        fieldId: lowestLevelBuildingInVillage.fieldId,
        type: lowestLevelBuildingInVillage.type,
        level: lowestLevelBuildingInVillage.level.total + 1,
      });

      buildingsToBuild.push(queuedBuilding);
    } else {
      // TODO do we want to allow only if there is none maxed already?
      if (!settings.allowFreeSpots) {
        continue;
      }

      const freeFieldIds = village.buildings.freeFieldIds();

      if (!freeFieldIds.length) {
        continue;
      }

      // build new at random free spot
      const freeFieldId = randomElement(freeFieldIds);
      const queuedBuilding = new QueuedBuilding({
        //  id is not important is it wont be placed into the queue
        queueId: '',
        fieldId: freeFieldId,
        type: neededBuildingType,
        level: 1,
      });

      buildingsToBuild.push(queuedBuilding);
    }
  }

  return {
    buildingsToBuild,
  };
};
