import {
  IAvailableNewBuilding,
  IBuildingQueue,
} from '../../_types/graphql';
import { BuildingType } from '../../../_shared/types/buildingType';
import { accountContext } from '../../accountContext';
import { AvailableBuildingTypesService } from '../../services/availableBuildingTypesService';
import {
  BuildingQueueService,
  MovingDirection,
} from '../../services/buildingQueueService';
import { buildingInfoService } from '../../services/info/buildingInfoService';
import { mapBuildingInProgress } from '../mappers/mapBuildingInProgress';
import { mapBuildingQueueFactory } from '../mappers/mapBuildingQueue';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';

export const buildingResolvers: Resolvers = {
  Query: {
    buildingSpots: (_, args) => {
      const { villageId } = args;
      const normalizedSpots = accountContext.villageService.village(villageId).buildings.normalizedBuildingSpots();

      return {
        infrastructure: normalizedSpots.filter(s => s.fieldId >= 19),
        resources: {
          wood: normalizedSpots.filter(s => s.type === BuildingType.Wood),
          clay: normalizedSpots.filter(s => s.type === BuildingType.Clay),
          iron: normalizedSpots.filter(s => s.type === BuildingType.Iron),
          crop: normalizedSpots.filter(s => s.type === BuildingType.Crop),
        },
      };
    },

    buildingQueue: (_, args): IBuildingQueue => {
      const {
        villageId,
      } = args;

      const village = accountContext.villageService.village(villageId);
      const { queue } = village.buildings;
      const queueService = new BuildingQueueService(villageId);
      const mapBuildingQueue = mapBuildingQueueFactory(queueService);

      return mapBuildingQueue(queue);
    },

    buildingsInProgress: (_, args) => accountContext.villageService.village(args.villageId).buildings.ongoing.buildings().map(mapBuildingInProgress),

    availableNewBuildings: (_, args) => {
      const {
        fieldId,
        villageId,
      } = args.input;

      const manager = new AvailableBuildingTypesService(villageId);
      return manager.availableBuildingTypes(fieldId).map((type): IAvailableNewBuilding => ({
        type,
        name: buildingInfoService.getBuildingInfo(type).name,
      }));
    },

    maxBuildingLevel: (_, args) => buildingInfoService.getBuildingInfo(args.buildingType).maxLevel,
  },

  Mutation: {
    clearQueue: (_, args) => {
      const {
        villageId,
      } = args;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.clearQueue();

      return true;
    },

    enqueueBuilding: async (_, args) => {
      const {
        villageId,
        ...enqueuedBuilding
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.enqueueBuilding(enqueuedBuilding);

      return true;
    },

    dequeueBuilding: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.dequeueBuilding(queueId);

      return true;
    },

    dequeueBuildingAtField: (_, args) => {
      const {
        villageId,
        ...input
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.dequeueBuildingAtField(input);

      return true;
    },

    moveQueuedBuildingDown: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      return queueManager.moveQueuedBuilding(queueId, MovingDirection.Down);
    },

    moveQueuedBuildingUp: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      return queueManager.moveQueuedBuilding(queueId, MovingDirection.Up);
    },

    moveQueuedBuildingAsHighAsPossible: (_, args) => {
      const queueManager = new BuildingQueueService(args.villageId);
      queueManager.moveAsHighAsPossible(args.queueId);
      return true;
    },
  },

  Subscription: {
    buildingsUpdated: subscribeToEvent(BotEvent.BuildingsUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: () => true,
    }),

    onQueueUpdated: subscribeToEvent(BotEvent.QueuedUpdated, {
      filter: (payload, variables) => payload.villageId === variables.villageId,
      resolve: () => true,
    }),
  },
};
