import { BuildingQueue as BuildingQueueModel } from '../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding as QueuedBuildingModel } from '../../_models/buildings/queue/queuedBuilding';
import { Cost as CostModel } from '../../_models/misc/cost';
import {
  BuildingQueue,
  QueuedBuilding,
} from '../../_types/graphql.type';
import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { MovingDirection } from '../../services/buildingQueueService';
import { buildingInfoService } from '../../services/info/buildingInfoService';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils';

const mapBuildingQueue = (queue: BuildingQueueModel, mbLevels: Record<string, number>): BuildingQueue => {
  const { speed } = getAccountContext().gameInfo;
  let totalCost = new CostModel();

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

const getBuildingQueue = (villageId: number) => {
  const village = getAccountContext().villageService.village(villageId);
  const { queue } = village.buildings;
  const queueService = getAccountContext().buildingQueueService.for(villageId);
  const mbLevels = queueService.getMainBuildingLevels();

  return mapBuildingQueue(queue, mbLevels);
};

export default <Resolvers> {
  Query: {
    buildingQueue: (_, args): BuildingQueue => getBuildingQueue(args.villageId),
    canMoveBuildingToIndex: (_, { index, queueId, villageId }) => {
      const queueService = getAccountContext().buildingQueueService.for(villageId);

      return queueService.canMoveBuildingToIndex(queueId, index);
    },
  },

  Mutation: {
    clearQueue: (_, args) => {
      const {
        villageId,
      } = args;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.clearQueue();

      return true;
    },

    dequeueBuilding: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.dequeueBuilding(queueId, true);

      return true;
    },

    dequeueBuildingAtField: (_, args) => {
      const {
        villageId,
        ...input
      } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.dequeueBuildingAtField(input);

      return true;
    },

    enqueueBuilding: async (_, args) => {
      const {
        villageId,
        ...enqueuedBuilding
      } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.enqueueBuilding(enqueuedBuilding);

      return true;
    },

    moveQueuedBuildingAsHighAsPossible: (_, args) => {
      const queueManager = getAccountContext().buildingQueueService.for(args.villageId);
      queueManager.moveAsHighAsPossible(args.queueId);
      return true;
    },

    moveQueuedBuildingDown: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.moveQueuedBuilding(queueId, MovingDirection.Down);
      return true;
    },

    moveQueuedBuildingUp: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.moveQueuedBuilding(queueId, MovingDirection.Up);
      return true;
    },

    moveQueuedBuildingToIndex: (_, { index, queueId, villageId }) => {
      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.moveBuildingToIndex(queueId, index);
      return true;
    },
  },

  Subscription: {
    onQueueUpdated: subscribeToEvent(BotEvent.QueuedUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: p => getBuildingQueue(p.villageId),
    }),
  },
};