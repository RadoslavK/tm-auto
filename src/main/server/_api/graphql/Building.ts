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
import { BuildingType } from '../../../../_shared/enums/BuildingType.js';
import { getAccountContext } from '../../accountContext.js';
import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import { AvailableBuildingTypesService } from '../../services/availableBuildingTypesService.js';
import { buildingInfoService } from '../../services/info/buildingInfoService.js';
import { getDirname } from '../../utils/getDirname.js';

const getBuildingSpots = (villageId: string) => {
  const normalizedSpots = getAccountContext()
    .villageService.village(villageId)
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
};

export const BuildingInfo = objectType({
  name: 'BuildingInfo',
  definition: t => {
    t.int('maxLevel');
    t.string('name');
  },
});

export const BuildingLevelInfo = objectType({
  name: 'BuildingLevelInfo',
  definition: t => {
    t.field('cost', { type: 'Resources' });
  },
});

export const BuildingSpotLevel = objectType({
  name: 'BuildingSpotLevel',
  definition: t => {
    t.int('actual');
    t.nullable.int('ongoing');
    t.nullable.int('queued');
    t.int('total');
  },
});

export const BuildingSpot = objectType({
  name: 'BuildingSpot',
  definition: t => {
    t.int('fieldId');
    t.field('level', {
      type: BuildingSpotLevel,
      resolve: (spot) => ({
        ...spot.level,
        total: spot.level.getTotal(),
      }),
    });
    t.int('type');
  },
  sourceType: {
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
  t.list.int('availableNewBuildingsTypes', {
    args: {
      input: arg({ type: AvailableNewBuildingsInput }),
    },
    resolve: (_, args) => {
      const { fieldId, villageId } = args.input;

      const manager = new AvailableBuildingTypesService(villageId);
      return [...manager.availableBuildingTypes(fieldId)];
    },
  });
});

export const BuildingInfoQuery = queryField(t => {
  t.field('buildingInfo', {
    type: BuildingInfo,
    args: {
      buildingType: intArg(),
    },
    resolve: (_, args) =>
      buildingInfoService.getBuildingInfo(args.buildingType),
  });
});

export const BuildingLevelInfoQuery = queryField(t => {
  t.field('buildingLevelInfo', {
    type: BuildingLevelInfo,
    args: {
      buildingType: intArg(),
      level: intArg(),
    },
    resolve: (_, { buildingType, level }) =>
      buildingInfoService.getBuildingLevelInfo(buildingType, level),
  });
});

export const BuildingSpotsQuery = queryField(t => {
  t.field('buildingSpots', {
    type: BuildingSpots,
    args: {
      villageId: idArg(),
    },
    resolve: (_, args) => getBuildingSpots(args.villageId),
  });
});

export const ActualBuildingLevelsUpdatedSubscription = subscriptionField(t => {
  t.nullable.boolean('actualBuildingLevelsUpdated', {
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(
      BotEvent.ActualBuildingLevelsUpdated,
      {
        filter: (payload, variables) =>
          payload.villageId === variables.villageId,
        resolve: () => null,
      },
    ),
  });
});
