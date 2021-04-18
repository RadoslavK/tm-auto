import { BuildingType } from 'shared/enums/BuildingType.js';

import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding.js';
import { buildingInfoService } from '../info/buildingInfoService.js';
import { VillageServiceBase } from '../villageServiceBase.js';
import type { SerializeQueue } from './types/serializeQueue.type.js';

type Input = {
  readonly fieldId: number;
  readonly targetLevel?: number | null;
  readonly type: BuildingType;
};

type Payload = {
  readonly addedNew: boolean;
  readonly building: QueuedBuilding;
}

export class EnqueueBuildingService extends VillageServiceBase {
  constructor(villageId: string, private serializeQueue: SerializeQueue) {
    super(villageId);
  }

  public enqueueBuilding = (building: Input): Payload | null => {
    const { fieldId, type } = building;

    const spot = this.village.buildings.spots.at(fieldId);
    const totalLevel = spot.level.getTotal();
    const { maxLevel } = buildingInfoService.getBuildingInfo(type);

    if ((spot.type !== BuildingType.None && totalLevel >= maxLevel) || (building.targetLevel && totalLevel >= building.targetLevel)) {
      return null;
    }

    const { queue } = this.village.buildings;

    const lastBuilding = queue.peekLast();
    let hasChanges = false;

    if (!lastBuilding || lastBuilding.fieldId !== fieldId) {
      const startingLevel = totalLevel + 1;
      let targetLevel = building.targetLevel ? building.targetLevel : startingLevel;

      const qBuilding = new QueuedBuilding({
        fieldId,
        id: QueuedBuilding.createId(),
        startingLevel,
        targetLevel,
        type,
        villageId: this.village.id,
      });

      queue.add(qBuilding);
      this.serializeQueue(true);

      return {
        addedNew: true,
        building: qBuilding,
      };
    } else {
      if (!building.targetLevel) {
        lastBuilding.targetLevel++;
        hasChanges = true;
      } else if (lastBuilding.targetLevel < building.targetLevel) {
        lastBuilding.targetLevel = building.targetLevel;
        hasChanges = true;
      }

      this.serializeQueue(hasChanges);

      return {
        addedNew: false,
        building: lastBuilding,
      };
    }
  };
}