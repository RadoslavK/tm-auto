import {
  idArg,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';

import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';

export const VillageCapacity = objectType({
  name: 'VillageCapacity',
  definition: t => {
    t.int('granary');
    t.int('warehouse');
  },
});

export const VillageResources = objectType({
  name: 'VillageResources',
  definition: t => {
    t.field('amount', {
      type: 'Resources',
    });
    t.field('capacity', {
      type: VillageCapacity,
    });
    t.field('production', { type: 'Resources' });
  },
});

export const Village = objectType({
  name: 'Village',
  definition: t => {
    t.id('id');
    t.field('coords', { type: 'Coords' });
    t.string('name');
    t.field('resources', { type: VillageResources });
    t.boolean('isCapital');
    t.field('tribe', { type: 'Tribe' });
    t.boolean('scanned');
  },
});

export const VillageCrannyCapacity = objectType({
  name: 'VillageCrannyCapacity',
  definition: t => {
    t.int('actual');
    t.int('ongoing');
    t.int('total');
  },
});

export const ActiveVillageIdQuery = queryField(t => {
  t.id('activeVillageId', {
    resolve: (_, _args, ctx) => ctx.villageService.currentVillageId,
  });
});

export const VillageQuery = queryField(t => {
  t.nullable.field('village', {
    type: Village,
    args: {
      villageId: idArg(),
    },
    resolve: (_, args, ctx) =>
      ctx.villageService.village(args.villageId),
  });
});

export const VillagesQuery = queryField(t => {
  t.list.field('villages', {
    type: Village,
    resolve: (_, _args, ctx) => [...ctx.villageService.allVillages()],
  });
});

export const CrannyCapacityQuery = queryField(t => {
  t.field('crannyCapacity', {
    type: VillageCrannyCapacity,
    args: {
      villageId: idArg(),
    },
    resolve(_, args, ctx) {
      const village = ctx.villageService.village(args.villageId);

      return ctx.crannyInfoService.getCapacity(village);
    },
  });
});

export const CrannyCapacitySubscription = subscriptionField(t => {
  t.field('onCrannyCapacityUpdated', {
    type: 'VillageCrannyCapacity',
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.CrannyCapacityUpdated, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: ({ villageId }, _args, ctx) => {
        const village = ctx.villageService.village(villageId);

        return ctx.crannyInfoService.getCapacity(village);
      },
    }),
  });
});

export const RefreshVillageMutation = mutationField(t => {
  t.nullable.boolean('refreshVillage', {
    args: {
      villageId: idArg(),
    },
    resolve: (_, args, ctx) => {
      ctx.controllerService.requestVillageRefresh(args.villageId);

      return null;
    },
  });
});

export const VillageUpdatedSubscription = subscriptionField(t => {
  t.field('villageUpdated', {
    type: Village,
    ...subscribeToEvent(BotEvent.VillageUpdated, {
      resolve: (p) => p.village,
    }),
  });
});

export const VillagesUpdatedSubscription = subscriptionField(t => {
  t.list.field('villagesUpdated', {
    type: Village,
    ...subscribeToEvent(BotEvent.VillagesUpdated, {
      resolve: (p) => [...p.villages],
    }),
  });
});

export const ActiveVillageIdChangedSubscription = subscriptionField(t => {
  t.id('activeVillageIdChanged', {
    ...subscribeToEvent(BotEvent.ActiveVillageIdChanged, {
      resolve: (p) => p.villageId,
    }),
  });
});
