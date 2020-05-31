import { BuildingQueue as BuildingQueueModel } from '../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding as QueuedBuildingModel } from '../../_models/buildings/queue/queuedBuilding';
import { Cost as CostModel } from '../../_models/misc/cost';
import {
  BuildingQueue,
  QueuedBuilding,
} from '../../_types/graphql.type';
import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import {
  BuildingQueueService,
  MovingDirection,
} from '../../services/buildingQueueService';
import { buildingInfoService } from '../../services/info/buildingInfoService';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils';

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

const getBuildingQueue = (villageId: number) => {
  const village = accountContext.villageService.village(villageId);
  const { queue } = village.buildings;
  const queueService = new BuildingQueueService(villageId);
  const createBuildingQueue = createBuildingQueueFactory(queueService);

  return createBuildingQueue(queue);
};

export default <Resolvers> {
  Query: {
    buildingQueue: (_, args): BuildingQueue => getBuildingQueue(args.villageId),
  },

  Mutation: {
    clearQueue: (_, args) => {
      const {
        villageId,
      } = args;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.clearQueue();

      return true;
    },

    dequeueBuilding: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.dequeueBuilding(queueId);

      return true;
    },

    dequeueBuildingAtField: (_, args) => {
      const {
        villageId,
        ...input
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.dequeueBuildingAtField(input);

      return true;
    },

    enqueueBuilding: async (_, args) => {
      const {
        villageId,
        ...enqueuedBuilding
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.enqueueBuilding(enqueuedBuilding);

      return true;
    },

    moveQueuedBuildingAsHighAsPossible: (_, args) => {
      const queueManager = new BuildingQueueService(args.villageId);
      queueManager.moveAsHighAsPossible(args.queueId);
      return true;
    },

    moveQueuedBuildingDown: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      return queueManager.moveQueuedBuilding(queueId, MovingDirection.Down);
    },

    moveQueuedBuildingUp: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      return queueManager.moveQueuedBuilding(queueId, MovingDirection.Up);
    },
  },

  Subscription: {
    onQueueUpdated: subscribeToEvent(BotEvent.QueuedUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: p => getBuildingQueue(p.villageId),
    }),
  },
};