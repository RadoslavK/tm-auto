import { BuildingQueue as BuildingQueueModel } from '../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding as QueuedBuildingModel } from '../../_models/buildings/queue/queuedBuilding';
import { Cost as CostModel } from '../../_models/misc/cost';
import {
  BuildingQueue,
  Cost,
  QueuedBuilding,
} from '../../_types/graphql';
import { accountContext } from '../../accountContext';
import {
  BuildingQueueService,
  MovingDirection,
} from '../../services/buildingQueueService';
import { buildingInfoService } from '../../services/info/buildingInfoService';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils';
import { mapResources } from './villageMappers';

const mapCost = (cost: CostModel): Cost => ({
  buildTime: cost.buildTime,
  resources: mapResources(cost.resources),
});

export const mapBuildingQueueFactory = (queueService: BuildingQueueService): (queue: BuildingQueueModel) => BuildingQueue => {
  const mbLevels = queueService.getMainBuildingLevels();
  const { speed } = accountContext.gameInfo;
  let totalCost = new CostModel();

  return (queue: BuildingQueueModel): BuildingQueue => {
    const buildings = queue.buildings().map((building: QueuedBuildingModel): QueuedBuilding => {
      const cost = buildingInfoService.getBuildingInfo(building.type).costs[building.level];
      const mbLevel = mbLevels[building.queueId];
      const actualBuildTime = getActualBuildingBuildTime(cost.buildTime, speed, mbLevel, building.type);

      totalCost = totalCost.add(new CostModel({
        buildTime: actualBuildTime,
        resources: cost.resources,
      }));

      return ({
        ...building,
        canMoveDown: queueService.canMoveQueuedBuilding(building.queueId, MovingDirection.Down),
        canMoveUp: queueService.canMoveQueuedBuilding(building.queueId, MovingDirection.Up),
        cost: mapCost({
          ...cost,
          buildTime: actualBuildTime,
        }),
        name: buildingInfoService.getBuildingInfo(building.type).name,
      });
    });

    return {
      buildings,
      totalCost: mapCost(totalCost),
    };
  };
};