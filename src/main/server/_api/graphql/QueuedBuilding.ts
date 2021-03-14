import {
  arg,
  idArg,
  inputObjectType,
  intArg,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { BuildingType } from '../../../../_shared/enums/BuildingType';
import { BuildingQueue as BuildingQueueModel } from '../../_models/buildings/queue/buildingQueue';
import { QueuedBuilding as QueuedBuildingModel } from '../../_models/buildings/queue/queuedBuilding';
import { Duration } from '../../_models/duration';
import { Resources } from '../../_models/misc/resources';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { buildingInfoService } from '../../services/info/buildingInfoService';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils';
import { NexusGenObjects } from '../graphqlSchema';

const mapBuildingQueue = (
  queue: BuildingQueueModel,
  mbLevels: Record<string, number>,
): NexusGenObjects['BuildingQueue'] => {
  const ranges = queue
    .buildings()
    .reduce(
      (
        reducedRanges,
        building,
        index,
        buildings,
      ): (QueuedBuildingModel & {
        readonly index: number;
      })[][] => {
        const buildingWithIndex = { ...building, index };

        if (index === 0) {
          reducedRanges.push([buildingWithIndex]);
        } else {
          const previousBuilding = buildings[index - 1];
          const isFromSameRangeAsPrevious =
            previousBuilding.fieldId === building.fieldId &&
            previousBuilding.level + 1 === building.level;

          if (isFromSameRangeAsPrevious) {
            reducedRanges[reducedRanges.length - 1].push(buildingWithIndex);
          } else {
            reducedRanges.push([buildingWithIndex]);
          }
        }

        return reducedRanges;
      },
      [] as (QueuedBuildingModel & { readonly index: number })[][],
    );

  const { speed } = getAccountContext().gameInfo;

  return ranges.reduce(
    (
      reducedQueue,
      range,
    ): {
      readonly buildingRanges: NexusGenObjects['QueuedBuildingRange'][];
      resourcesBuildingTime: Duration;
      infrastructureBuildingTime: Duration;
      totalCost: Resources;
      totalBuildingTime: Duration;
    } => {
      const [firstBuilding] = range;
      const lastBuilding = range[range.length - 1];

      const rangeResult = range.reduce(
        (
          reducedResult,
          building,
        ): {
          readonly cost: Resources;
          readonly resourcesBuildingTime: Duration;
          readonly infrastructureBuildingTime: Duration;
          readonly buildings: NexusGenObjects['QueuedBuilding'][];
        } => {
          const mbLevel = mbLevels[building.queueId];
          const {
            buildingTime,
            cost,
          } = buildingInfoService.getBuildingLevelInfo(
            building.type,
            building.level,
          );

          const actualBuildTime = getActualBuildingBuildTime(
            buildingTime,
            speed,
            mbLevel,
            building.type,
          );

          const clientBuildingModel: NexusGenObjects['QueuedBuilding'] = {
            ...building,
            buildingTime: actualBuildTime,
            queueIndex: building.index,
          };

          if (building.type > BuildingType.Crop) {
            reducedResult.infrastructureBuildingTime = reducedResult.infrastructureBuildingTime.add(
              actualBuildTime,
            );
          } else {
            reducedResult.resourcesBuildingTime = reducedResult.resourcesBuildingTime.add(
              actualBuildTime,
            );
          }

          reducedResult.buildings.push(clientBuildingModel);
          reducedResult.cost = reducedResult.cost.add(cost);

          return reducedResult;
        },
        {
          buildings: [],
          resourcesBuildingTime: new Duration(),
          infrastructureBuildingTime: new Duration(),
          cost: new Resources(),
        } as {
          cost: Resources;
          infrastructureBuildingTime: Duration;
          resourcesBuildingTime: Duration;
          readonly buildings: NexusGenObjects['QueuedBuilding'][];
        },
      );

      const totalBuildingTime = rangeResult.resourcesBuildingTime.add(
        rangeResult.infrastructureBuildingTime,
      );

      const clientRange: NexusGenObjects['QueuedBuildingRange'] = {
        id: `${firstBuilding.fieldId}_${lastBuilding.level}`,
        type: firstBuilding.type,
        cost: rangeResult.cost,
        fieldId: firstBuilding.fieldId,
        buildingTime: totalBuildingTime,
        buildings: rangeResult.buildings,
      };

      return {
        buildingRanges: reducedQueue.buildingRanges.concat(clientRange),
        totalCost: reducedQueue.totalCost.add(rangeResult.cost),
        totalBuildingTime: reducedQueue.totalBuildingTime.add(
          totalBuildingTime,
        ),
        resourcesBuildingTime: reducedQueue.resourcesBuildingTime.add(
          rangeResult.resourcesBuildingTime,
        ),
        infrastructureBuildingTime: reducedQueue.infrastructureBuildingTime.add(
          rangeResult.infrastructureBuildingTime,
        ),
      };
    },
    {
      totalCost: new Resources(),
      totalBuildingTime: new Duration(),
      infrastructureBuildingTime: new Duration(),
      resourcesBuildingTime: new Duration(),
      buildingRanges: [],
    } as {
      readonly buildingRanges: NexusGenObjects['QueuedBuildingRange'][];
      totalCost: Resources;
      resourcesBuildingTime: Duration;
      infrastructureBuildingTime: Duration;
      totalBuildingTime: Duration;
    },
  );
};

const getBuildingQueue = (villageId: string) => {
  const village = getAccountContext().villageService.village(villageId);
  const { queue } = village.buildings;
  const queueService = getAccountContext().buildingQueueService.for(villageId);
  const mbLevels = queueService.getMainBuildingLevels();

  return mapBuildingQueue(queue, mbLevels);
};

export const QueuedBuilding = objectType({
  name: 'QueuedBuilding',
  definition: t => {
    t.field('buildingTime', { type: 'Duration' });
    t.int('level');
    t.int('type');
    t.id('queueId');
    t.int('queueIndex');
    t.int('fieldId');
  },
});

export const QueuedBuildingRange = objectType({
  name: 'QueuedBuildingRange',
  definition: t => {
    t.string('id');
    t.list.field('buildings', { type: QueuedBuilding });
    t.int('type');
    t.int('fieldId');
    t.field('buildingTime', { type: 'Duration' });
    t.field('cost', { type: 'Resources' });
  },
});

export const BuildingQueue = objectType({
  name: 'BuildingQueue',
  definition: t => {
    t.list.field('buildingRanges', { type: QueuedBuildingRange });
    t.field('totalBuildingTime', { type: 'Duration' });
    t.field('resourcesBuildingTime', { type: 'Duration' });
    t.field('infrastructureBuildingTime', { type: 'Duration' });
    t.field('totalCost', { type: 'Resources' });
  },
});

export const BuildingQueueQuery = queryField(t => {
  t.field('buildingQueue', {
    type: BuildingQueue,
    args: {
      villageId: idArg(),
    },
    resolve: (_, args) => getBuildingQueue(args.villageId),
  });
});

export const CanMoveQueuedBuildingToIndexQuery = queryField(t => {
  t.boolean('canMoveQueuedBuildingToIndex', {
    args: {
      villageId: idArg(),
      queueId: idArg(),
      index: intArg(),
    },
    resolve: (_, { index, queueId, villageId }) => {
      const queueService = getAccountContext().buildingQueueService.for(
        villageId,
      );

      return queueService.canMoveBuildingToIndex(queueId, index);
    },
  });
});

export const CanMoveQueuedBuildingsBlockToIndexQuery = queryField(t => {
  t.boolean('canMoveQueuedBuildingsBlockToIndex', {
    args: {
      villageId: idArg(),
      topBuildingQueueId: idArg(),
      bottomBuildingQueueId: idArg(),
      index: intArg(),
    },
    resolve: (_, args) => {
      const queueService = getAccountContext().buildingQueueService.for(
        args.villageId,
      );

      return queueService.canMoveBuildingsBlockToIndex(
        args.topBuildingQueueId,
        args.bottomBuildingQueueId,
        args.index,
      );
    },
  });
});

export const ClearQueueInput = inputObjectType({
  name: 'ClearQueueInput',
  definition: t => {
    t.id('villageId');
  },
});

export const EnqueueBuildingInput = inputObjectType({
  name: 'EnqueueBuildingInput',
  definition: t => {
    t.int('fieldId');
    t.int('type');
    t.id('villageId');
    t.nullable.int('targetLevel');
  },
});

export const DequeueBuildingInput = inputObjectType({
  name: 'DequeueBuildingInput',
  definition: t => {
    t.id('queueId');
    t.id('villageId');
  },
});

export const DequeueBuildingAtFieldInput = inputObjectType({
  name: 'DequeueBuildingAtFieldInput',
  definition: t => {
    t.nullable.int('targetLevel');
    t.int('fieldId');
    t.id('villageId');
  },
});

export const ClearQueueMutation = mutationField(t => {
  t.nullable.boolean('clearQueue', {
    args: {
      villageId: idArg(),
    },
    resolve: (_, args) => {
      const { villageId } = args;

      const queueManager = getAccountContext().buildingQueueService.for(
        villageId,
      );

      queueManager.clearQueue();

      return null;
    },
  });
});

export const DequeueBuildingMutation = mutationField(t => {
  t.nullable.boolean('dequeueBuilding', {
    args: {
      input: arg({ type: DequeueBuildingInput }),
    },
    resolve: (_, args) => {
      const { queueId, villageId } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(
        villageId,
      );

      queueManager.dequeueBuilding(queueId, true);

      return null;
    },
  });
});

export const DequeueBuildingsBlockMutation = mutationField(t => {
  t.nullable.boolean('dequeueBuildingsBlock', {
    args: {
      villageId: idArg(),
      topBuildingQueueId: idArg(),
      bottomBuildingQueueId: idArg(),
    },
    resolve: (_, args) => {
      const { bottomBuildingQueueId, topBuildingQueueId, villageId } = args;

      const queueManager = getAccountContext().buildingQueueService.for(
        villageId,
      );

      queueManager.dequeueBuildingsBlock(
        topBuildingQueueId,
        bottomBuildingQueueId,
      );

      return null;
    },
  });
});

export const DequeueBuildingAtFieldMutation = mutationField(t => {
  t.nullable.boolean('dequeueBuildingAtField', {
    args: {
      input: arg({ type: DequeueBuildingAtFieldInput }),
    },
    resolve: (_, args) => {
      const { villageId, ...input } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(
        villageId,
      );

      queueManager.dequeueBuildingAtField(input);

      return null;
    },
  });
});

export const EnqueueBuildingMutation = mutationField(t => {
  t.nullable.boolean('enqueueBuilding', {
    args: {
      input: arg({ type: EnqueueBuildingInput }),
    },
    resolve: async (_, args) => {
      const { villageId, ...enqueuedBuilding } = args.input;

      const queueManager = getAccountContext().buildingQueueService.for(
        villageId,
      );

      queueManager.enqueueBuilding(enqueuedBuilding);

      return null;
    },
  });
});

export const MoveQueuedBuildingToIndexMutation = mutationField(t => {
  t.nullable.boolean('moveQueuedBuildingToIndex', {
    args: {
      villageId: idArg(),
      queueId: idArg(),
      index: intArg(),
    },
    resolve: (_, { index, queueId, villageId }) => {
      const queueManager = getAccountContext().buildingQueueService.for(
        villageId,
      );

      queueManager.moveBuildingToIndex(queueId, index);

      return null;
    },
  });
});

export const MoveQueuedBuildingsBlockToIndexMutation = mutationField(t => {
  t.nullable.boolean('moveQueuedBuildingsBlockToIndex', {
    args: {
      villageId: idArg(),
      topBuildingQueueId: idArg(),
      bottomBuildingQueueId: idArg(),
      index: intArg(),
    },
    resolve: (_, args) => {
      const {
        bottomBuildingQueueId,
        index,
        topBuildingQueueId,
        villageId,
      } = args;

      const queueManager = getAccountContext().buildingQueueService.for(
        villageId,
      );

      queueManager.moveQueuedBuildingsBlockToIndex(
        topBuildingQueueId,
        bottomBuildingQueueId,
        index,
      );

      return null;
    },
  });
});

export const MoveQueuedBuildingAsHighAsPossibleMutation = mutationField(t => {
  t.nullable.boolean('moveQueuedBuildingAsHighAsPossible', {
    args: {
      villageId: idArg(),
      queueId: idArg(),
    },
    resolve: (_, args) => {
      const queueManager = getAccountContext().buildingQueueService.for(
        args.villageId,
      );

      queueManager.moveAsHighAsPossible(args.queueId);

      return null;
    },
  });
});

export const MoveQueuedBuildingsBlockAsHighAsPossibleMutation = mutationField(t => {
  t.nullable.boolean('moveQueuedBuildingsBlockAsHighAsPossible', {
    args: {
      villageId: idArg(),
      topBuildingQueueId: idArg(),
      bottomBuildingQueueId: idArg(),
    },
    resolve: (_, args) => {
      const queueManager = getAccountContext().buildingQueueService.for(
        args.villageId,
      );

      queueManager.moveBlockAsHighAsPossible(
        args.topBuildingQueueId,
        args.bottomBuildingQueueId,
      );

      return null;
    },
  });
});

export const QueueUpdatedSubscription = subscriptionField(t => {
  t.field('queueUpdated', {
    type: BuildingQueue,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.QueuedUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: (p) => getBuildingQueue(p.villageId),
    }),
  });
});