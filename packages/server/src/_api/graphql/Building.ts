import {
  arg,
  enumType,
  idArg,
  inputObjectType,
  intArg,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { join } from 'path';
import {
  BuildingState,
  buildingStates,
} from 'shared/enums/BuildingState.js';
import { getDirname } from 'shared/utils/getDirname.js';

import type { BuildingSpotLevel as BuildingSpotLevelModel } from '../../_models/buildings/spots/buildingSpotLevel.js';
import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import {
  isInfrastructure,
  isResourceField,
} from '../../utils/buildingUtils.js';
import type { NexusGenObjects } from '../graphqlSchema.js';

export const BuildingStateEnum = enumType({
  name: 'BuildingState',
  members: buildingStates,
});

const getBuildingSpotState = (level: BuildingSpotLevelModel, maxLevel: number): BuildingState => {
  const isCompleted = level.actual === maxLevel;
  const isMaxed = level.getTotal() === maxLevel;
  const isOngoingMaxed = level.ongoing === maxLevel;

  if (isCompleted) {
    return 'Completed';
  }

  if (isOngoingMaxed) {
    return 'OngoingMaxed';
  }

  if (isMaxed) {
    return 'QueueMaxed';
  }

  return 'None';
};

export const BuildingSpotLevel = objectType({
  name: 'BuildingSpotLevel',
  definition: t => {
    t.int('actual');
    t.nullable.int('ongoing');
    t.nullable.int('queued');
    t.int('total');
    t.field('state', { type: BuildingStateEnum });
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
      resolve: ({ level, type }, _, ctx): NexusGenObjects['BuildingSpotLevel'] => ({
        actual: level.actual,
        ongoing: level.ongoing,
        queued: level.queued,
        total: level.getTotal(),
        state: getBuildingSpotState(level, ctx.buildingInfoService.getBuildingInfo(type).maxLevel),
      }),
    });
    t.int('type');
    t.string('name', {
      resolve: (building, _args, ctx) => ctx.buildingInfoService.getBuildingInfo(building.type).name,
    });
    t.int('maxLevel', {
      resolve: (building, _args, ctx) => ctx.buildingInfoService.getBuildingInfo(building.type).maxLevel,
    });
  },
  sourceType: process.env.shouldGenerateArtifacts && {
    module: join(getDirname(import.meta), '../../_models/buildings/spots/buildingSpot.ts'),
    export: 'BuildingSpot',
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

export const ResourceFieldsQuery = queryField(t => {
  t.list.field('resourceFields', {
    type: BuildingSpot,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) =>
      ctx
        .villageService.village(villageId)
        .buildings.spots.buildings()
        .filter(b => isResourceField(b.fieldId)),
  });
});

export const InfrastructureQuery = queryField(t => {
  t.list.field('infrastructure', {
    type: BuildingSpot,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) =>
      ctx
        .villageService.village(villageId)
        .buildings.spots.buildings()
        .filter(b => isInfrastructure(b.fieldId)),
  });
});

export const BuildingInfoObject = objectType({
  name: 'BuildingInfo',
  definition: t => {
    t.string('name');
  },
});

export const BuildingInfoQuery = queryField(t => {
  t.field('buildingInfo', {
    type: BuildingInfoObject,
    args: {
      type: intArg(),
    },
    resolve: (_, { type }, ctx) =>
      ctx.buildingInfoService.getBuildingInfo(type),
  });
});

export const BuildingSpotSubscription = subscriptionField(t => {
  t.field('onBuildingSpotUpdated', {
    type: 'BuildingSpot',
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.BuildingSpotUpdated, {
      filter: (payload, variables) =>
        payload.villageId === variables.villageId,
      resolve: ({ buildingSpot }) => buildingSpot,
    }),
  });
});