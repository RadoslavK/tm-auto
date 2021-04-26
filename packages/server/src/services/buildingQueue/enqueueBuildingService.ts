import { BuildingType } from 'shared/enums/BuildingType.js';

import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding.js';
import { AccountContext } from '../../accountContext.js';
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
  //  Null - add to end, number - add to this index
  readonly newIndex: number | null;
  readonly building: QueuedBuilding;
}

export class EnqueueBuildingService extends VillageServiceBase {
  constructor(villageId: string, private serializeQueue: SerializeQueue) {
    super(villageId);
  }

  public enqueueBuilding = async (building: Input, addNewToTop: boolean): Promise<Payload | null> => {
    const { fieldId, type } = building;

    const spot = this.village.buildings.spots.at(fieldId);
    const totalLevel = spot.level.getTotal();

    const { maxLevel } = buildingInfoService.getBuildingInfo(type, this.village.id);

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

      if (addNewToTop) {
        const { removedBuildings, updatedBuildings } = await AccountContext.getContext().buildingQueueService.for(this.village.id).moveAsHighAsPossible(qBuilding.id);

        if (updatedBuildings.length && removedBuildings.length) {
          return {
            addedNew: false,
            newIndex: null,
            //  The new one should be removed and some previous one updated
            building: updatedBuildings[0],
          };
        } else {
          const newIndex = queue.buildings().indexOf(qBuilding);
          return {
            addedNew: true,
            newIndex,
            //  Just the new one was moved
            building: qBuilding,
          };
        }
      }

      this.serializeQueue(true);

      return {
        addedNew: true,
        newIndex: null,
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
        newIndex: null,
        building: lastBuilding,
      };
    }
  };
}