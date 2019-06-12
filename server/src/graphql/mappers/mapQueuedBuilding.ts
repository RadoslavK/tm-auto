import { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding';
import { IQueuedBuilding } from '../../_types/graphql';
import { buildingNames } from '../../constants/buildingNames';
import { buildingInfos } from '../../index';
import { BuildingQueueManager, MovingDirection } from '../../services/buildingQueueManager';
import { mapCost } from './mapCost';

export const mapQueuedBuildingFactory = (queueManager: BuildingQueueManager) => (building: QueuedBuilding): IQueuedBuilding => ({
  ...building,
  canMoveDown: queueManager.canMoveQueuedBuilding(building.queueId, MovingDirection.Down),
  canMoveUp: queueManager.canMoveQueuedBuilding(building.queueId, MovingDirection.Up),
  name: buildingNames[building.type],
  cost: mapCost(buildingInfos[building.type][building.level - 1].cost),
});
