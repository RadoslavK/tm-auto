import {
  AvailableNewBuilding,
  BuildingQueue,
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
  Mutation: {
    clearQueue: (_, args) => {
      const {
        villageId,
      } = args;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.clearQueue();

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

    enqueueBuilding: async (_, args) => {
      const {
        villageId,
        ...enqueuedBuilding
      } = args.input;

      const queueManager = new BuildingQueueService(villageId);
      queueManager.enqueueBuilding(enqueuedBuilding);

      return true;
    },

    moveQueuedBuildingAsHighAsPossible: (_, args) => {
      const queueManager = new BuildingQueueService(args.villageId);
      queueManager.moveAsHighAsPossible(args.queueId);
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
  },

  Query: {
    availableNewBuildings: (_, args) => {
      const {
        fieldId,
        villageId,
      } = args.input;

      const manager = new AvailableBuildingTypesService(villageId);
      return manager.availableBuildingTypes(fieldId).map((type): AvailableNewBuilding => ({
        name: buildingInfoService.getBuildingInfo(type).name,
        type,
      }));
    },

    buildingQueue: (_, args): BuildingQueue => {
      const {
        villageId,
      } = args;

      const village = accountContext.villageService.village(villageId);
      const { queue } = village.buildings;
      const queueService = new BuildingQueueService(villageId);
      const mapBuildingQueue = mapBuildingQueueFactory(queueService);

      return mapBuildingQueue(queue);
    },

    buildingSpots: (_, args) => {
      const { villageId } = args;
      const normalizedSpots = accountContext.villageService.village(villageId).buildings.normalizedBuildingSpots();

      return {
        infrastructure: normalizedSpots.filter(s => s.fieldId >= 19),
        resources: {
          clay: normalizedSpots.filter(s => s.type === BuildingType.Clay),
          crop: normalizedSpots.filter(s => s.type === BuildingType.Crop),
          iron: normalizedSpots.filter(s => s.type === BuildingType.Iron),
          wood: normalizedSpots.filter(s => s.type === BuildingType.Wood),
        },
      };
    },

    buildingsInProgress: (_, args) => accountContext.villageService.village(args.villageId).buildings.ongoing.buildings().map(x => mapBuildingInProgress(x)),

    maxBuildingLevel: (_, args) => buildingInfoService.getBuildingInfo(args.buildingType).maxLevel,
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
