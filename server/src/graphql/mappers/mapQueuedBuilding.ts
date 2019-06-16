import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding';
import { IQueuedBuilding } from '../../_types/graphql';
import { buildingNames } from '../../constants/buildingNames';
import { buildingInfos } from '../../index';
import { BuildingQueueService, MovingDirection } from '../../services/buildingQueueService';
import { mapCost } from './mapCost';

export const mapQueuedBuildingFactory = (queueManager: BuildingQueueService) => (building: QueuedBuilding): IQueuedBuilding => ({
  ...building,
  canMoveDown: queueManager.canMoveQueuedBuilding(building.queueId, MovingDirection.Down),
  canMoveUp: queueManager.canMoveQueuedBuilding(building.queueId, MovingDirection.Up),
  name: buildingNames[building.type],
  cost: mapCost(buildingInfos[building.type][building.level - 1].cost),
});
