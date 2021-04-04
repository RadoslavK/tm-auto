import {
  idArg,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { join } from 'path';
import { getDirname } from 'shared/utils/getDirname.js';

import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';

const __dirname = process.env.shouldGenerateArtifacts && getDirname(import.meta) || '';

export const BuildingInProgress = objectType({
  name: 'BuildingInProgress',
  definition: t => {
    t.int('level');
    t.field('finishedAt', {
      type: 'Timestamp',
      resolve: (b) => ({
        totalSeconds: Math.floor(b.finishedAt.valueOf() / 1000),
      }),
    });
    t.int('type');
    t.string('name', {
      resolve: (building, _args, ctx) => ctx.buildingInfoService.getBuildingInfo(building.type).name,
    });
    t.int('fieldId');
  },
  sourceType: {
    module: join(__dirname, '../../_models/buildings/inProgress/buildingInProgress.ts'),
    export: 'BuildingInProgress',
  },
});

export const BuildingsInProgressQuery = queryField(t => {
  t.list.field('buildingsInProgress', {
    type: BuildingInProgress,
    args: {
      villageId: idArg(),
    },
    resolve: (_, args, ctx) =>
      [...ctx
        .villageService.village(args.villageId)
        .buildings.ongoing.buildings()],
  });
});

export const BuildingsInProgressUpdatedSubscription = subscriptionField(t => {
  t.list.field('buildingsInProgressUpdated', {
    type: BuildingInProgress,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(
      BotEvent.BuildingsInProgressUpdated,
      {
        filter: (payload, args) => payload.villageId === args.villageId,
        resolve: (p, _args, ctx) =>
          [...ctx
            .villageService.village(p.villageId)
            .buildings.ongoing.buildings()],
      },
    ),
  });
});