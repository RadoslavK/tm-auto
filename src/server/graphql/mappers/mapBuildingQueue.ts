import { BuildingQueue } from '../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding';
import { Cost } from '../../_models/misc/cost';
import {
  IBuildingQueue,
  IQueuedBuilding,
} from '../../_types/graphql';
import { accountContext } from '../../accountContext';
import {
  BuildingQueueService,
  MovingDirection,
} from '../../services/buildingQueueService';
import { buildingInfoService } from '../../services/info/buildingInfoService';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils';

export const mapBuildingQueueFactory = (queueService: BuildingQueueService): (queue: BuildingQueue) => IBuildingQueue => {
  const mbLevels = queueService.getMainBuildingLevels();
  const { speed } = accountContext.gameInfo;
  let totalCost = new Cost();

  return (queue: BuildingQueue): IBuildingQueue => {
    const buildings = queue.buildings().map((building: QueuedBuilding): IQueuedBuilding => {
      const cost = buildingInfoService.getBuildingInfo(building.type).costs[building.level];
      const mbLevel = mbLevels[building.queueId];
      const actualBuildTime = getActualBuildingBuildTime(cost.buildTime, speed, mbLevel, building.type);

      totalCost = totalCost.add(new Cost({
        buildTime: actualBuildTime,
        resources: cost.resources,
      }));

      return ({
        ...building,
        canMoveDown: queueService.canMoveQueuedBuilding(building.queueId, MovingDirection.Down),
        canMoveUp: queueService.canMoveQueuedBuilding(building.queueId, MovingDirection.Up),
        cost: {
          ...cost,
          buildTime: actualBuildTime,
        },
        name: buildingInfoService.getBuildingInfo(building.type).name,
      });
    });

    return {
      buildings,
      totalCost,
    };
  };
};
