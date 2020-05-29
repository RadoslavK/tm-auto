import { Resolvers } from '../../_types';
import { BuildingQueue as BuildingQueueModel } from '../../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding as QueuedBuildingModel } from '../../../_models/buildings/queue/queuedBuilding';
import { Cost as CostModel } from '../../../_models/misc/cost';
import { accountContext } from '../../../accountContext';
import {
  BuildingQueueService,
  MovingDirection,
} from '../../../services/buildingQueueService';
import { buildingInfoService } from '../../../services/info/buildingInfoService';
import { getActualBuildingBuildTime } from '../../../utils/buildTimeUtils';
import {
  BuildingQueue,
  QueuedBuilding,
} from '../../graphql.type';

const createBuildingQueueFactory = (queueService: BuildingQueueService): (queue: BuildingQueueModel) => BuildingQueue => {
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

export default <Resolvers> {
  Query: {
    buildingQueue: (_, args): BuildingQueue => {
      const {
        villageId,
      } = args;

      const village = accountContext.villageService.village(villageId);
      const { queue } = village.buildings;
      const queueService = new BuildingQueueService(villageId);
      const createBuildingQueue = createBuildingQueueFactory(queueService);

      return createBuildingQueue(queue);
    },
  },
};