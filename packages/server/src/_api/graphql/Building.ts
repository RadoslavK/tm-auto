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
import {
  BuildingState,
  buildingStates,
} from 'shared/enums/BuildingState.js';
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { BuildingSpot } from '../../_models/buildings/spots/buildingSpot.js';
import type { BuildingSpotLevel as BuildingSpotLevelModel } from '../../_models/buildings/spots/buildingSpotLevel.js';
import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import {
  isInfrastructure,
  isResourceField,
} from '../../utils/buildingUtils.js';
import type { ApiContext } from '../apiContext.type.js';
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

//  No local resolvers because we need to pass the village id somehow
const mapBuildingSpot = (buildingSpot: BuildingSpot, villageId: string, ctx: ApiContext): NexusGenObjects['BuildingSpot'] => {
  const { level, type } = buildingSpot;
  const info = ctx.buildingInfoService.getBuildingInfo(type);
  const { isCapital } = ctx.villageService.village(villageId);
  const maxLevel = type <= BuildingType.Crop && !isCapital ? 10 : info.maxLevel;
  const name = info.name;

  return {
    ...buildingSpot,
    name,
    maxLevel,
    level: {
      actual: level.actual,
      ongoing: level.ongoing,
      queued: level.queued,
      total: level.getTotal(),
      state: getBuildingSpotState(level, maxLevel),
    },
  };
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

export const BuildingSpotObject = objectType({
  name: 'BuildingSpot',
  definition: t => {
    t.id('id');
    t.int('fieldId');
    t.field('level', { type: BuildingSpotLevel });
    t.int('type');
    t.string('name');
    t.int('maxLevel');
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
    type: BuildingSpotObject,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) =>
      ctx
        .villageService.village(villageId)
        .buildings.spots.buildings()
        .filter(b => isResourceField(b.fieldId))
        .map(b => mapBuildingSpot(b, villageId, ctx)),
  });
});

export const InfrastructureQuery = queryField(t => {
  t.list.field('infrastructure', {
    type: BuildingSpotObject,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) =>
      ctx
        .villageService.village(villageId)
        .buildings.spots.buildings()
        .filter(b => isInfrastructure(b.fieldId))
        .map(b => mapBuildingSpot(b, villageId, ctx)),
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
    type: BuildingSpotObject,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.BuildingSpotUpdated, {
      filter: (payload, variables) =>
        payload.villageId === variables.villageId,
      resolve: ({ buildingSpot }, { villageId }, ctx) => mapBuildingSpot(buildingSpot, villageId, ctx),
    }),
  });
});