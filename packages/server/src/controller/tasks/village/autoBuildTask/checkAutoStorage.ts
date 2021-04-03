import { BuildingType } from 'shared/enums/BuildingType.js';

import { BuildingSpotType } from '../../../../_enums/buildingSpotType.js';
import { QueuedBuilding } from '../../../../_models/buildings/queue/queuedBuilding.js';
import { Tribe } from '../../../../_models/enums/tribe.js';
import type { AutoStorageSettings } from '../../../../_models/settings/tasks/autoBuildSettings/autoStorageSettings.js';
import type { Village } from '../../../../_models/village/village.js';
import { AccountContext } from '../../../../accountContext.js';
import { buildingInfoService } from '../../../../services/info/buildingInfoService.js';
import {
  getWithMinimum,
  getWithMinimumSafe,
} from '../../../../utils/getWithMaximum.js';
import { randomElement } from '../../../../utils/randomElement.js';

type Result = {
  readonly buildingsToBuild: readonly QueuedBuilding[];
};

export const checkAutoStorage = async (
  village: Village,
  settings: AutoStorageSettings,
): Promise<Result> => {
  const buildingsToBuild: QueuedBuilding[] = [];

  let nextTaskHighestWarehouseCost = 0;
  let nextTaskHighestGranaryCost = 0;

  // Check if next building exceeds Granary/Warehouse capacity

  if (AccountContext.getContext().gameInfo.tribe === Tribe.Romans) {
    const resourceField = village.buildings.queue.peek(BuildingSpotType.Fields);

    if (resourceField) {
      const resourcesNeeded = buildingInfoService.getBuildingLevelInfo(
        resourceField.type,
        resourceField.startingLevel,
      ).cost;

      nextTaskHighestWarehouseCost = resourcesNeeded.getRequiredWarehouseSize();
      nextTaskHighestGranaryCost = resourcesNeeded.crop;
    }

    const infrastructureField = village.buildings.queue.peek(
      BuildingSpotType.Infrastructure,
    );

    if (infrastructureField) {
      const resourcesNeeded = buildingInfoService.getBuildingLevelInfo(
        infrastructureField.type,
        infrastructureField.startingLevel,
      ).cost;

      nextTaskHighestWarehouseCost = Math.max(
        nextTaskHighestWarehouseCost,
        resourcesNeeded.getRequiredWarehouseSize(),
      );
      nextTaskHighestGranaryCost = Math.max(
        nextTaskHighestGranaryCost,
        resourcesNeeded.crop,
      );
    }
  } else {
    const building = village.buildings.queue.peek(BuildingSpotType.Any);

    if (building) {
      const resourcesNeeded = buildingInfoService.getBuildingLevelInfo(
        building.type,
        building.startingLevel,
      ).cost;
      nextTaskHighestWarehouseCost = resourcesNeeded.getRequiredWarehouseSize();
      nextTaskHighestGranaryCost = resourcesNeeded.crop;
    }
  }

  const nextTaskExceedsWarehouseCapacity =
    nextTaskHighestWarehouseCost > village.resources.capacity.warehouse;
  const nextTaskExceedsGranaryCapacity =
    nextTaskHighestGranaryCost > village.resources.capacity.granary;

  // End check

  const neededBuildings: BuildingType[] = [];

  if (
    settings.warehouse.allow &&
    (village.getGranaryFullness() >= settings.warehouse.overflowLevel ||
      nextTaskExceedsWarehouseCapacity)
  ) {
    neededBuildings.push(BuildingType.Warehouse);
  }

  if (
    settings.granary.allow &&
    (village.getGranaryFullness() >= settings.granary.overflowLevel ||
      nextTaskExceedsGranaryCapacity)
  ) {
    neededBuildings.push(BuildingType.Granary);
  }

  for (const neededBuildingType of neededBuildings) {
    const isBeingBuilt = village.buildings.ongoing
      .buildings()
      .some((b) => b.type === neededBuildingType);

    if (isBeingBuilt) {
      continue;
    }

    //  get queued building with lowest level
    const qBuilding = getWithMinimumSafe(
      village.buildings.queue
        .buildings()
        .filter((b) => b.fieldId === neededBuildingType),
      (b) => b.startingLevel,
    );

    const lowestLevelBuildingInVillage = getWithMinimum(
      village.buildings.spots
        .buildings()
        .filter(
          (b) =>
            b.type === neededBuildingType &&
            b.level.actual !==
              buildingInfoService.getBuildingInfo(b.type).maxLevel,
        ),
      (b) => b.level.actual,
    );

    const levelOfLowestLevelBuildingInVillage = lowestLevelBuildingInVillage
      ? lowestLevelBuildingInVillage.level.getActualAndOngoing()
      : 0;

    if (
      qBuilding &&
      qBuilding.startingLevel === levelOfLowestLevelBuildingInVillage + 1
    ) {
      // is already in queue and equal to minimum next level, so build that one
      buildingsToBuild.push(qBuilding);
    } else if (lowestLevelBuildingInVillage) {
      // exists and not max level
      const queuedBuilding = new QueuedBuilding({
        fieldId: lowestLevelBuildingInVillage.fieldId,
        startingLevel: lowestLevelBuildingInVillage.level.getTotal() + 1,
        targetLevel: lowestLevelBuildingInVillage.level.getTotal() + 1,
        //  id is not important is it wont be placed into the queue
        id: '',
        type: lowestLevelBuildingInVillage.type,
      });

      buildingsToBuild.push(queuedBuilding);
    } else {
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
        fieldId: freeFieldId,
        startingLevel: 1,
        targetLevel: 1,
        //  id is not important is it wont be placed into the queue
        id: '',
        type: neededBuildingType,
      });

      buildingsToBuild.push(queuedBuilding);
    }
  }

  return {
    buildingsToBuild,
  };
};
