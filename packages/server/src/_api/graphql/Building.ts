import {
  arg,
  idArg,
  inputObjectType,
  intArg,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { join } from 'path';
import { BuildingType } from 'shared/enums/BuildingType.js';
import { getDirname } from 'shared/utils/getDirname.js';

import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';

export const BuildingSpotLevel = objectType({
  name: 'BuildingSpotLevel',
  definition: t => {
    t.int('actual');
    t.nullable.int('ongoing');
    t.nullable.int('queued');
    t.int('total', {
      resolve: (level) => level.getTotal(),
    });
  },
  sourceType: process.env.shouldGenerateArtifacts && {
    module: join(getDirname(import.meta), '../../_models/buildings/spots/buildingSpotLevel.ts'),
    export: 'BuildingSpotLevel',
  },
});

export const AvailableNewBuilding = objectType({
  name: 'AvailableNewBuilding',
  definition: t => {
    t.int('type');
    t.string('name', {
      resolve: (building, _args, ctx) => ctx.buildingInfoService.getBuildingInfo(building.type).name,
    });
    t.int('maxLevel', {
      resolve: (building, _args, ctx) => ctx.buildingInfoService.getBuildingInfo(building.type).maxLevel,
    });
  },
});

export const BuildingSpot = objectType({
  name: 'BuildingSpot',
  definition: t => {
    t.id('id');
    t.int('fieldId');
    t.field('level', {
      type: BuildingSpotLevel,
    });
    t.int('type');
    t.string('name', {
      resolve: (building, _args, ctx) => ctx.buildingInfoService.getBuildingInfo(building.type).name,
    });
    t.int('maxLevel', {
      resolve: (building, _args, ctx) => ctx.buildingInfoService.getBuildingInfo(building.type).maxLevel,
    });
  },
});

export const ResourceFields = objectType({
  name: 'ResourceFields',
  definition: t => {
    t.list.field('wood', {
      type: BuildingSpot,
    });
    t.list.field('clay', {
      type: BuildingSpot,
    });
    t.list.field('iron', {
      type: BuildingSpot,
    });
    t.list.field('crop', {
      type: BuildingSpot,
    });
  },
});

export const BuildingSpots = objectType({
  name: 'BuildingSpots',
  definition: t => {
    t.list.field('infrastructure', { type: BuildingSpot });
    t.field('resources', { type: ResourceFields });
  },
});

export const AvailableNewBuildingsInput = inputObjectType({
  name: 'AvailableNewBuildingsInput',
  definition: t => {
    t.int('fieldId');
    t.id('villageId');
  },
});

export const AvailableNewBuildingsTypesQuery = queryField(t => {
  t.list.field('availableNewBuildings', {
    type: AvailableNewBuilding,
    args: {
      input: arg({ type: AvailableNewBuildingsInput }),
    },
    resolve: (_, args, ctx) => {
      const { fieldId, villageId } = args.input;
      const village = ctx.villageService.village(villageId);

      return [...ctx.availableBuildingTypesService.availableBuildingTypes(village, fieldId).map(type => ({ type }))];
    },
  });
});

export const BuildingSpotsQuery = queryField(t => {
  t.field('buildingSpots', {
    type: BuildingSpots,
    args: {
      villageId: idArg(),
    },
    resolve(_, args, ctx) {
      const normalizedSpots = ctx
        .villageService.village(args.villageId)
        .buildings.spots.buildings();

      return {
        infrastructure: normalizedSpots.filter((s) => s.fieldId >= 19),
        resources: {
          clay: normalizedSpots.filter((s) => s.type === BuildingType.Clay),
          crop: normalizedSpots.filter((s) => s.type === BuildingType.Crop),
          iron: normalizedSpots.filter((s) => s.type === BuildingType.Iron),
          wood: normalizedSpots.filter((s) => s.type === BuildingType.Wood),
        },
      };
    },
  });
});

export const BuildingSpotSubscription = subscriptionField(t => {
  t.field('onBuildingSpotUpdated', {
    type: 'BuildingSpot',
    args: {
      villageId: idArg(),
      fieldId: intArg(),
    },
    ...subscribeToEvent(BotEvent.BuildingSpotUpdated, {
      filter: (payload, variables) =>
        payload.villageId === variables.villageId
        && payload.buildingSpot.fieldId === variables.fieldId,
      resolve: ({ buildingSpot }) => buildingSpot,
    }),
  });
});