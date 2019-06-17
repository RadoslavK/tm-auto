import { BuildingQueue } from '../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding';
import { Cost } from '../../_models/misc/cost';
import { IBuildingQueue, IQueuedBuilding } from '../../_types/graphql';
import { buildingInfos } from '../../index';
import { BuildingQueueService, MovingDirection } from '../../services/buildingQueueService';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils';
import { context } from '../context';
import { mapCost } from './mapCost';

export const mapBuildingQueueFactory = (queueService: BuildingQueueService) => {
  const mbLevels = queueService.getMainBuildingLevels();
  const speed = context.player.speed;
  let totalCost = new Cost();

  return (queue: BuildingQueue): IBuildingQueue => {
    const buildings = queue.buildings().map((building: QueuedBuilding): IQueuedBuilding => {
      const cost = buildingInfos[building.type].costs[building.level];
      const mbLevel = mbLevels[building.queueId];
      const actualBuildTime = getActualBuildingBuildTime(cost.buildTime, speed, mbLevel, building.type);

      totalCost = totalCost.add({
        buildTime: actualBuildTime,
        resources: cost.resources,
      });

      return ({
        ...building,
        canMoveDown: queueService.canMoveQueuedBuilding(building.queueId, MovingDirection.Down),
        canMoveUp: queueService.canMoveQueuedBuilding(building.queueId, MovingDirection.Up),
        name: buildingInfos[building.type].name,
        cost: mapCost({
          ...cost,
          buildTime: actualBuildTime,
        }),
      });
    });

    return {
      buildings,
      totalCost: mapCost(totalCost),
    };
  };
};
