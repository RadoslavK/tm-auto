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
import { join } from 'path';
import { BuildingType } from 'shared/enums/BuildingType.js';
import { getDirname } from 'shared/utils/getDirname.js';

import type { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding.js';
import { Duration } from '../../_models/duration.js';
import { Resources } from '../../_models/misc/resources.js';
import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import { DequeueMode } from '../../services/buildingQueueService.js';
import {
  isInfrastructure,
  isResourceField,
} from '../../utils/buildingUtils.js';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils.js';
import type { ApiContext } from '../apiContext.type.js';

const getTotalQueuedBuildingCost = (qBuilding: QueuedBuilding, ctx: ApiContext): Resources => {
  let cost = new Resources();

  for (let level = qBuilding.startingLevel; level <= qBuilding.targetLevel; level++) {
    const levelCost = ctx.buildingInfoService.getBuildingLevelInfo(qBuilding.type, level).cost;
    cost = cost.add(levelCost);
  }

  return cost;
};

const getTotalQueuedBuildingDuration = (qBuilding: QueuedBuilding, ctx: ApiContext): Duration => {
  const { speed } = ctx.gameInfo;
  const mbLevels = ctx.buildingQueueService.for(qBuilding.villageId).getMainBuildingLevels();
  let buildingTime = new Duration();
  let mbLevel = mbLevels.get(qBuilding.id) ?? 0;

  for (let level = qBuilding.startingLevel; level <= qBuilding.targetLevel; level++) {
    const levelBuildingTime = ctx.buildingInfoService.getBuildingLevelInfo(qBuilding.type, level).buildingTime;

    const actualBuildTime = getActualBuildingBuildTime(
      levelBuildingTime,
      speed,
      mbLevel,
      qBuilding.type,
    );

    buildingTime = buildingTime.add(actualBuildTime);

    //  increase mbLevel because mbLevels contains info about mb level prior to this queued building with multiple levels
    //  and if this q building is MB with multiple levels we need to update the level prior to each following level
    if (qBuilding.type === BuildingType.MainBuilding) {
      mbLevel++;
    }
  }

  return buildingTime;
};

export const QueuedBuildingObject = objectType({
  name: 'QueuedBuilding',
  definition: t => {
    t.field('buildingTime', {
      type: 'Duration',
      resolve: (qBuilding, _args, ctx) => getTotalQueuedBuildingDuration(qBuilding, ctx),
    });
    t.int('startingLevel');
    t.int('targetLevel');
    t.int('type');
    t.string('name', {
      resolve: (building, _args, ctx) => ctx.buildingInfoService.getBuildingInfo(building.type).name,
    });
    t.field('cost', {
      type: 'Resources',
      resolve: (qBuilding, _args, ctx) => getTotalQueuedBuildingCost(qBuilding, ctx),
    });
    t.id('id');
    t.int('fieldId');
  },
  sourceType: process.env.shouldGenerateArtifacts && {
    module: join(getDirname(import.meta), '../../_models/buildings/queue/queuedBuilding.ts'),
    export: 'QueuedBuilding',
  },
});

export const BuildingQueue = objectType({
  name: 'BuildingQueue',
  definition: t => {
    t.list.field('buildings', { type: QueuedBuildingObject });
    t.field('totalBuildingTime', {
      type: 'Duration',
      resolve: (queue, _args, ctx) => {
        return queue.buildings().reduce(
          (totalBuildingTime, qBuilding) => {
            let buildingTime = new Duration();

            for (let level = qBuilding.startingLevel; level <= qBuilding.targetLevel; level++) {
              const levelBuildingTime = ctx.buildingInfoService.getBuildingLevelInfo(qBuilding.type, level).buildingTime;
              buildingTime = buildingTime.add(levelBuildingTime);
            }

            return totalBuildingTime.add(buildingTime);
          },
          new Duration(),
        );
      },
    });
    //  TODO compute these only for Roman and when the split queue is allowed in settings
    t.field('resourcesBuildingTime', {
      type: 'Duration',
      resolve: (queue, _args, ctx) => {
        return queue.buildings().reduce(
          (totalBuildingTime, qBuilding) => {
            if (!isResourceField(qBuilding.fieldId)) {
              return totalBuildingTime;
            }

            let buildingTime = getTotalQueuedBuildingDuration(qBuilding, ctx);
            return totalBuildingTime.add(buildingTime);
          },
          new Duration(),
        );
      },
    });
    t.field('infrastructureBuildingTime', {
      type: 'Duration',
      resolve: (queue, _args, ctx) => {
        return queue.buildings().reduce(
          (totalBuildingTime, qBuilding) => {
            if (!isInfrastructure(qBuilding.fieldId)) {
              return totalBuildingTime;
            }

            let buildingTime = getTotalQueuedBuildingDuration(qBuilding, ctx);
            return totalBuildingTime.add(buildingTime);
          },
          new Duration(),
        );
      },
    });
    t.field('totalCost', {
      type: 'Resources',
      resolve: (queue, _args, ctx) => {
        return queue.buildings().reduce(
          (totalCost, qBuilding) => {
            let cost = getTotalQueuedBuildingCost(qBuilding, ctx);

            return totalCost.add(cost);
          },
          new Resources(),
        );
      },
    });
  },
  sourceType: process.env.shouldGenerateArtifacts && {
    module: join(getDirname(import.meta), '../../_models/buildings/queue/buildingQueue.ts'),
    export: 'BuildingQueue',
  },
});

export const BuildingQueueQuery = queryField(t => {
  t.field('buildingQueue', {
    type: BuildingQueue,
    args: {
      villageId: idArg(),
    },
    resolve(_, args, ctx) {
      return ctx.villageService.village(args.villageId).buildings.queue;
    },
  });
});

export const CanMoveQueuedBuildingQuery = queryField(t => {
  t.boolean('canMoveQueuedBuilding', {
    args: {
      villageId: idArg(),
      queueId: idArg(),
      targetQueueId: idArg(),
    },
    resolve: (_, { targetQueueId, queueId, villageId }, ctx) => {
      const queueService = ctx.buildingQueueService.for(
        villageId,
      );

      return queueService.canMoveBuildingToIndex(queueId, targetQueueId);
    },
  });
});

export const EnqueueBuildingInput = inputObjectType({
  name: 'EnqueueBuildingInput',
  definition: t => {
    t.int('fieldId');
    t.int('type');
    t.id('villageId');
    t.nullable.int('targetLevel');
    t.boolean('addNewToTop');
  },
});

export const EnqueueBuildingPayload = objectType({
  name: 'EnqueueBuildingPayload',
  definition: t => {
    t.boolean('addedNew');
    t.field('building', { type: QueuedBuildingObject });
    t.field('queue', { type: BuildingQueue });
  },
});

export const EnqueueBuildingMutation = mutationField(t => {
  t.nullable.field('enqueueBuilding', {
    type: EnqueueBuildingPayload,
    args: {
      input: arg({ type: EnqueueBuildingInput }),
    },
    resolve: (_, args ,ctx) => {
      const { villageId, addNewToTop, ...enqueuedBuilding } = args.input;

      const result = ctx.buildingQueueService.for(villageId).enqueue.enqueueBuilding(enqueuedBuilding, addNewToTop);

      return result && {
        ...result,
        queue: ctx.villageService.village(villageId).buildings.queue,
      };
    },
  });
});

export const ClearQueueMutation = mutationField(t => {
  t.field('clearQueue', {
    type: BuildingQueue,
    args: {
      villageId: idArg(),
    },
    resolve: (_, args, ctx) =>
      ctx.buildingQueueService.for(args.villageId).clearQueue(),
  });
});

export const DequeueBuildingInput = inputObjectType({
  name: 'DequeueBuildingInput',
  definition: t => {
    t.id('queueId');
    t.id('villageId');
    t.nullable.int('level');
  },
});

export const ModificationPayload = objectType({
  name: 'ModificationPayload',
  definition: t => {
    t.list.field('removedBuildings', { type: QueuedBuildingObject });
    t.list.field('updatedBuildings', { type: QueuedBuildingObject });
    t.field('queue', { type: BuildingQueue });
  },
});

export const DequeueBuildingMutation = mutationField(t => {
  t.field('dequeueBuilding', {
    type: ModificationPayload,
    args: {
      input: arg({ type: DequeueBuildingInput }),
    },
    resolve: async (_, args, ctx) => {
      const { villageId, queueId, level } = args.input;

      const { updatedBuildings, removedBuildings } = await ctx.buildingQueueService.for(villageId).dequeueBuilding({
        queueId,
        mode: DequeueMode.FromApi,
        level,
      });
      const { queue } = ctx.villageService.village(villageId).buildings;

      return {
        removedBuildings: [...removedBuildings],
        updatedBuildings: [...updatedBuildings],
        queue,
      };
    },
  });
});

export const DequeueBuildingAtFieldInput = inputObjectType({
  name: 'DequeueBuildingAtFieldInput',
  definition: t => {
    t.id('villageId');
    t.int('fieldId');
    t.nullable.int('targetLevel');
  },
});

export const DequeueBuildingAtFieldMutation = mutationField(t => {
  t.field('dequeueBuildingAtField', {
    type: ModificationPayload,
    args: {
      input: arg({ type: DequeueBuildingAtFieldInput }),
    },
    resolve: async (_, args, ctx) => {
      const { villageId, ...input } = args.input;

      const { removedBuildings, updatedBuilding } = await ctx.buildingQueueService.for(villageId).dequeueBuildingAtField(input);
      const { queue } = ctx.villageService.village(villageId).buildings;

      return {
        removedBuildings: [...removedBuildings],
        updatedBuildings: updatedBuilding ? [updatedBuilding] : [],
        queue,
      };
    },
  });
});

export const MoveQueuedBuildingMutation = mutationField(t => {
  t.field('moveQueuedBuildingToIndex', {
    type: ModificationPayload,
    args: {
      villageId: idArg(),
      queueId: idArg(),
      targetQueueId: idArg(),
    },
    resolve: async (_, { targetQueueId, queueId, villageId }, ctx) => {
      const queueManager = ctx.buildingQueueService.for(villageId);

      const { removedBuildings, updatedBuildings } = await queueManager.moveBuildingToIndex(queueId, targetQueueId);
      const { queue } = ctx.villageService.village(villageId).buildings;

      return {
        queue,
        removedBuildings: [...removedBuildings],
        updatedBuildings: [...updatedBuildings],
      };
    },
  });
});

export const MoveQueuedBuildingAsHighAsPossibleMutation = mutationField(t => {
  t.field('moveQueuedBuildingAsHighAsPossible', {
    type: ModificationPayload,
    args: {
      villageId: idArg(),
      queueId: idArg(),
    },
    resolve: async (_, args, ctx) => {
      const queueManager = ctx.buildingQueueService.for(args.villageId);

      const { updatedBuildings, removedBuildings } = await queueManager.moveAsHighAsPossible(args.queueId);
      const { queue } = ctx.villageService.village(args.villageId).buildings;

      return {
        queue,
        removedBuildings: [...removedBuildings],
        updatedBuildings: [...updatedBuildings],
      };
    },
  });
});

export const SplitQueueBuildingPayload = objectType({
  name: 'SplitQueueBuildingPayload',
  definition: t => {
    t.nullable.field('updatedBuilding', { type: QueuedBuildingObject });
    t.nullable.field('addedBuilding', { type: QueuedBuildingObject });
  },
});

export const SplitQueuedBuildingMutation = mutationField(t => {
  t.field('splitQueuedBuilding', {
    type: SplitQueueBuildingPayload,
    args: {
      villageId: idArg(),
      queueId: idArg(),
      startingLevel: intArg(),
    },
    resolve: (_, args, ctx) => {
      return ctx.buildingQueueService.for(args.villageId).split.splitBuilding(args.queueId, args.startingLevel);
    },
  });
});

export const MergeQueueBuildingsPayload = objectType({
  name: 'MergeQueueBuildingsPayload',
  definition: t => {
    t.nullable.field('updatedBuilding', { type: QueuedBuildingObject });
    t.nullable.field('removedBuilding', { type: QueuedBuildingObject });
  },
});

export const MergeQueuedBuildingsMutation = mutationField(t => {
  t.field('mergeQueuedBuildings', {
    type: MergeQueueBuildingsPayload,
    args: {
      villageId: idArg(),
      topQueueId: idArg(),
    },
    resolve: (_, args, ctx) => {
      return ctx.buildingQueueService.for(args.villageId).merge.mergeBuildings(args.topQueueId);
    },
  });
});

export const QueuedBuildingUpdatedSubscription = subscriptionField(t => {
  t.field('queuedBuildingUpdated', {
    type: ModificationPayload,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.QueuedBuildingUpdated, {
      filter: (payload, variables) =>
        payload.villageId === variables.villageId,
      resolve: (p, args, ctx) => {
        const removed = p.type === 'removed';
        return {
          updatedBuildings: removed ? [] : [p.queuedBuilding],
          removedBuildings: removed ? [p.queuedBuilding] : [],
          queue: ctx.villageService.village(args.villageId).buildings.queue,
        };
      },
    }),
  });
});

export const BuildingQueueCorrectedSubscription = subscriptionField(t => {
  t.field('buildingQueueCorrected', {
    type: ModificationPayload,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.BuildingQueueCorrected, {
      filter: (p, variables) => variables.villageId === p.villageId,
      resolve: (p, args, ctx) => ({
        removedBuildings: [...p.removedBuildings],
        updatedBuildings: [],
        queue: ctx.villageService.village(args.villageId).buildings.queue,
      }),
    }),
  });
});

export const BuildingQueueTimesUpdated = subscriptionField(t => {
  t.field('buildingQueueTimesUpdated', {
    type: BuildingQueue,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.BuildingQueueTimesUpdated, {
      filter: (p, variables) => p.villageId === variables.villageId,
      resolve: (_, args, ctx) => ctx.villageService.village(args.villageId).buildings.queue,
    }),
  });
});