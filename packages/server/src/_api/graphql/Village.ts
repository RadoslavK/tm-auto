import {
  idArg,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { BuildingType } from 'shared/enums/BuildingType.js';
import { VillageCrannyCapacity as VillageCrannyCapacityModel } from '../../_models/village/villageCrannyCapacity.js';
import { getAccountContext } from '../../accountContext.js';
import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import { controllerService } from '../../services/controllerService.js';
import { crannyInfoService } from '../../services/crannyInfoService.js';

const getCrannyCapacity = (villageId: string) => {
  const crannies = getAccountContext()
    .villageService.village(villageId)
    .buildings.spots.buildings()
    .filter((s) => s.type === BuildingType.Cranny);

  const emptyCapacity = new VillageCrannyCapacityModel();

  if (!crannies.length) {
    return emptyCapacity;
  }

  return crannies.reduce<VillageCrannyCapacityModel>((capacity, cranny) => {
    const actual = crannyInfoService.getCapacity(cranny.level.actual);
    const ongoing = crannyInfoService.getCapacity(
      cranny.level.getActualAndOngoing(),
    );
    const total = crannyInfoService.getCapacity(cranny.level.getTotal());

    return capacity.add(
      new VillageCrannyCapacityModel({
        actual,
        ongoing,
        total,
      }),
    );
  }, emptyCapacity);
};

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
    resolve: () => getAccountContext().villageService.currentVillageId,
  });
})

export const VillageQuery = queryField(t => {
  t.nullable.field('village', {
    type: Village,
    args: {
      villageId: idArg(),
    },
    resolve: (_, args) =>
      getAccountContext().villageService.village(args.villageId),
  });
});

export const VillagesQuery = queryField(t => {
  t.list.field('villages', {
    type: Village,
    resolve: () => [...getAccountContext().villageService.allVillages()],
  });
});

export const CrannyCapacityQuery = queryField(t => {
  t.field('crannyCapacity', {
    type: VillageCrannyCapacity,
    args: {
      villageId: idArg(),
    },
    resolve: (_, args) => getCrannyCapacity(args.villageId),
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
      resolve: ({ villageId }) => getCrannyCapacity(villageId),
    })
  })
});

export const RefreshVillageMutation = mutationField(t => {
  t.nullable.boolean('refreshVillage', {
    args: {
      villageId: idArg(),
    },
    resolve: async (_, args) => {
      await controllerService.requestVillageRefresh(args.villageId);

      return null;
    },
  });
});

export const VillageUpdatedSubscription = subscriptionField(t => {
  t.field('villageUpdated', {
    type: Village,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.VillageUpdated, {
      filter: (p, args) => p.village.id === args.villageId,
      resolve: (p) => p.village,
    }),
  })
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
