import { BuildingQueue as BuildingQueueModel } from '../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding as QueuedBuildingModel } from '../../_models/buildings/queue/queuedBuilding';
import { Cost as CostModel } from '../../_models/misc/cost';
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

  return ranges.reduce((reducedQueue, range): { readonly buildingRanges: QueuedBuildingRange[]; totalCost: CostModel } => {
    const firstBuilding = range[0];
    const lastBuilding = range[range.length - 1];

    const { costs, name } = buildingInfoService.getBuildingInfo(firstBuilding.type);

    const rangeResult = range.reduce((reducedResult, building): { readonly cost: CostModel; readonly buildings: QueuedBuilding[] } => {
      const cost = costs[building.level];
      const mbLevel = mbLevels[building.queueId];
      const actualBuildTime = getActualBuildingBuildTime(cost.buildTime, speed, mbLevel, building.type);

      const actualCost = new CostModel({
        resources: cost.resources,
        buildTime: actualBuildTime,
      });

      const clientBuildingModel: QueuedBuilding = {
        ...building,
        queueIndex: building.index,
        cost: actualCost,
        name,
      };

      reducedResult.buildings.push(clientBuildingModel);
      reducedResult.cost = reducedResult.cost.add(actualCost);

      return reducedResult;
    }, { buildings: [], cost: new CostModel() } as { cost: CostModel; readonly buildings: QueuedBuilding[] });

    const clientRange: QueuedBuildingRange = {
      id: `${firstBuilding.fieldId}_${lastBuilding.level}`,
      type: firstBuilding.type,
      name,
      cost: rangeResult.cost,
      fieldId: firstBuilding.fieldId,
      buildings: rangeResult.buildings,
    };

    return {
      buildingRanges: reducedQueue.buildingRanges.concat(clientRange),
      totalCost: reducedQueue.totalCost.add(rangeResult.cost),
    };
  }, { totalCost: new CostModel(), buildingRanges: [] } as { readonly buildingRanges: QueuedBuildingRange[]; totalCost: CostModel });
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

    moveQueuedBuildingToIndex: (_, { index, queueId, villageId }) => {
      const queueManager = getAccountContext().buildingQueueService.for(villageId);
      queueManager.moveBuildingToIndex(queueId, index);
      return true;
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