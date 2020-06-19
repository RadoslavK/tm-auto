import { BuildingQueue as BuildingQueueModel } from '../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding as QueuedBuildingModel } from '../../_models/buildings/queue/queuedBuilding';
import { Duration } from '../../_models/duration';
import { Resources } from '../../_models/misc/resources';
import {
  BuildingQueue,
  QueuedBuilding,
  QueuedBuildingRange,
} from '../../_types/graphql.type';
import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { buildingInfoService } from '../../services/info/buildingInfoService';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils';

const mapBuildingQueue = (queue: BuildingQueueModel, mbLevels: Record<string, number>): BuildingQueue => {
  const ranges = queue
    .buildings()
    .reduce((reducedRanges, building, index, buildings): (QueuedBuildingModel & { readonly index: number })[][] => {
      const buildingWithIndex = { ...building, index };

      if (index === 0) {
        reducedRanges.push([buildingWithIndex]);
      } else {
        const previousBuilding = buildings[index - 1];
        const isFromSameRangeAsPrevious = previousBuilding.fieldId === building.fieldId
          && previousBuilding.level + 1 === building.level;

        if (isFromSameRangeAsPrevious) {
          reducedRanges[reducedRanges.length - 1].push(buildingWithIndex);
        } else {
          reducedRanges.push([buildingWithIndex]);
        }
      }

      return reducedRanges;
    }, [] as (QueuedBuildingModel & { readonly index: number })[][]);

  const { speed } = getAccountContext().gameInfo;

  return ranges.reduce((reducedQueue, range): { readonly buildingRanges: QueuedBuildingRange[]; totalCost: Resources; totalBuildingTime: Duration } => {
    const firstBuilding = range[0];
    const lastBuilding = range[range.length - 1];

    const rangeResult = range.reduce((reducedResult, building): { readonly cost: Resources; readonly buildingTime: Duration; readonly buildings: QueuedBuilding[] } => {
      const mbLevel = mbLevels[building.queueId];
      const {
        buildingTime,
        cost,
      } = buildingInfoService.getBuildingLevelInfo(building.type, building.level);

      const actualBuildTime = getActualBuildingBuildTime(buildingTime, speed, mbLevel, building.type);

      const clientBuildingModel: QueuedBuilding = {
        ...building,
        buildingTime: actualBuildTime,
        queueIndex: building.index,
      };

      reducedResult.buildingTime = reducedResult.buildingTime.add(actualBuildTime);
      reducedResult.buildings.push(clientBuildingModel);
      reducedResult.cost = reducedResult.cost.add(cost);

      return reducedResult;
    }, { buildings: [], buildingTime: new Duration(), cost: new Resources() } as { cost: Resources; buildingTime: Duration; readonly buildings: QueuedBuilding[] });

    const clientRange: QueuedBuildingRange = {
      id: `${firstBuilding.fieldId}_${lastBuilding.level}`,
      type: firstBuilding.type,
      cost: rangeResult.cost,
      fieldId: firstBuilding.fieldId,
      buildingTime: rangeResult.buildingTime,
      buildings: rangeResult.buildings,
    };

    return {
      buildingRanges: reducedQueue.buildingRanges.concat(clientRange),
      totalCost: reducedQueue.totalCost.add(rangeResult.cost),
      totalBuildingTime: reducedQueue.totalBuildingTime.add(rangeResult.buildingTime),
    };
  }, { totalCost: new Resources(), totalBuildingTime: new Duration(), buildingRanges: [] } as { readonly buildingRanges: QueuedBuildingRange[]; totalCost: Resources; totalBuildingTime: Duration });
};

const getBuildingQueue = (villageId: string) => {
  const village = getAccountContext().villageService.village(villageId);
  const { queue } = village.buildings;
  const queueService = getAccountContext().buildingQueueService.for(villageId);
  const mbLevels = queueService.getMainBuildingLevels();

  return mapBuildingQueue(queue, mbLevels);
};

export default <Resolvers> {
  Query: {
    buildingQueue: (_, args): BuildingQueue => getBuildingQueue(args.villageId),
    canMoveQueuedBuildingToIndex: (_, { index, queueId, villageId }) => {
      const queueService = getAccountContext().buildingQueueService.for(villageId);

      return queueService.canMoveBuildingToIndex(queueId, index);
    },
    canMoveQueuedBuildingsBlockToIndex: (_, args) => {
      const queueService = getAccountContext().buildingQueueService.for(args.villageId);

      return queueService.canMoveBuildingsBlockToIndex(args.topBuildingQueueId, args.bottomBuildingQueueId, args.index);
    },
  },

  Mutation: {
    clearQueue: (_, args) => {
      const {
        villageId,
      } = args;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.clearQueue();
    },

    dequeueBuilding: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.dequeueBuilding(queueId, true);
    },

    dequeueBuildingsBlock: (_, args) => {
      const {
        bottomBuildingQueueId,
        topBuildingQueueId,
        villageId,
      } = args;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.dequeueBuildingsBlock(topBuildingQueueId, bottomBuildingQueueId);
    },

    dequeueBuildingAtField: (_, args) => {
      const {
        villageId,
        ...input
      } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.dequeueBuildingAtField(input);
    },

    enqueueBuilding: async (_, args) => {
      const {
        villageId,
        ...enqueuedBuilding
      } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.enqueueBuilding(enqueuedBuilding);
    },

    moveQueuedBuildingAsHighAsPossible: (_, args) => {
      const queueManager = getAccountContext().buildingQueueService.for(args.villageId);
      queueManager.moveAsHighAsPossible(args.queueId);
    },

    moveQueuedBuildingToIndex: (_, { index, queueId, villageId }) => {
      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.moveBuildingToIndex(queueId, index);
    },

    moveQueuedBuildingsBlockToIndex: (_, args) => {
      const {
        bottomBuildingQueueId,
        index,
        topBuildingQueueId,
        villageId,
      } = args;

      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.moveQueuedBuildingsBlockToIndex(topBuildingQueueId, bottomBuildingQueueId, index);
    },

    moveQueuedBuildingsBlockAsHighAsPossible: (_, args) => {
      const queueManager = getAccountContext().buildingQueueService.for(args.villageId);
      queueManager.moveBlockAsHighAsPossible(args.topBuildingQueueId, args.bottomBuildingQueueId);
    },
  },

  Subscription: {
    queueUpdated: subscribeToEvent(BotEvent.QueuedUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: p => getBuildingQueue(p.villageId),
    }),
  },
};