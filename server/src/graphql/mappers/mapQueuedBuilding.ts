import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding';
import { IQueuedBuilding } from '../../_types/graphql';
import { buildingInfos } from '../../index';
import { BuildingQueueService, MovingDirection } from '../../services/buildingQueueService';
import { mapCost } from './mapCost';

export const mapQueuedBuildingFactory = (queueManager: BuildingQueueService) => (building: QueuedBuilding): IQueuedBuilding => ({
  ...building,
  canMoveDown: queueManager.canMoveQueuedBuilding(building.queueId, MovingDirection.Down),
  canMoveUp: queueManager.canMoveQueuedBuilding(building.queueId, MovingDirection.Up),
  name: buildingInfos[building.type].name,
  cost: mapCost(buildingInfos[building.type].costs[building.level]),
});
