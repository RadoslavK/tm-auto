import { BuildingQueue } from '../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding';
import { Cost } from '../../_models/misc/cost';
import { IBuildingQueue, IQueuedBuilding } from '../../_types/graphql';
import { BuildingQueueService, MovingDirection } from '../../services/buildingQueueService';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils';
import { accountContext } from '../../accountContext';
import { buildingsService } from '../../services/buildingsService';

export const mapBuildingQueueFactory = (queueService: BuildingQueueService): (queue: BuildingQueue) => IBuildingQueue => {
  const mbLevels = queueService.getMainBuildingLevels();
  const { speed } = accountContext.gameInfo;
  let totalCost = new Cost();

  return (queue: BuildingQueue): IBuildingQueue => {
    const buildings = queue.buildings().map((building: QueuedBuilding): IQueuedBuilding => {
      const cost = buildingsService.getBuildingInfo(building.type).costs[building.level];
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
        name: buildingsService.getBuildingInfo(building.type).name,
        cost: {
          ...cost,
          buildTime: actualBuildTime,
        },
      });
    });

    return {
      buildings,
      totalCost,
    };
  };
};
