import { BuildingType } from '../../_enums/BuildingType';
import { IBuildingQueue, IResolvers } from '../../_types/graphql';
import { MovingDirection } from '../../services/buildingQueueManager';
import { BuildingQueueManager } from '../../services/buildingQueueManager';
import { AvailableBuildingTypesManager } from '../../services/availableBuildingTypesManager';
import { context } from '../context';
import { mapAvailableNewBuilding } from '../mappers/mapAvailableNewBuilding';
import { mapBuildingInProgress } from '../mappers/mapBuildingInProgress';
import { mapCost } from '../mappers/mapCost';
import { mapQueuedBuildingFactory } from '../mappers/mapQueuedBuilding';

export const buildingResolvers: IResolvers = {
  Query: {
    buildingSpots: (_, args) => {
      const { villageId } = args;
      const normalizedSpots = context.villages.village(villageId).buildings.normalizedBuildingSpots();

      return {
        infrastructure: normalizedSpots.filter(s => s.fieldId >= 19),
        resources: {
          wood: normalizedSpots.filter(s => s.type === BuildingType.Wood),
          clay: normalizedSpots.filter(s => s.type === BuildingType.Clay),
          iron: normalizedSpots.filter(s => s.type === BuildingType.Iron),
          crop: normalizedSpots.filter(s => s.type === BuildingType.Crop),
        }
      }
    },

    buildingQueue: (_, args): IBuildingQueue => {
      const {
        villageId,
      } = args;

      const village = context.villages.village(villageId);
      const buildings = village.buildings.queue.buildings();
      const totalCost = village.buildings.queue.totalCost();
      const queueManager = new BuildingQueueManager(villageId);
      const mapQueuedBuilding = mapQueuedBuildingFactory(queueManager);

      return {
        buildings: buildings.map(mapQueuedBuilding),
        totalCost: mapCost(totalCost),
      };
    },

    buildingsInProgress: (_, args) => context.villages.village(args.villageId).buildings.ongoing.buildings().map(mapBuildingInProgress),

    availableNewBuildings: (_, args) => {
      const {
        fieldId,
        villageId,
      } = args.input;

      const manager = new AvailableBuildingTypesManager(villageId);
      return manager.availableBuildingTypes(fieldId).map(mapAvailableNewBuilding);
    },
  },

  Mutation: {
    clearQueue: (_, args) => {
      const {
        villageId,
      } = args;

      const queueManager = new BuildingQueueManager(villageId);
      queueManager.clearQueue();

      return true;
    },

    enqueueBuilding: (_, args) => {
      const {
        villageId,
        ...enqueuedBuilding
      } = args.input;

      const queueManager = new BuildingQueueManager(villageId);
      queueManager.enqueueBuilding(enqueuedBuilding);

      return true;
    },

    dequeueBuilding: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = new BuildingQueueManager(villageId);
      queueManager.dequeueBuilding(queueId);

      return true;
    },

    dequeueBuildingAtField: (_, args) => {
      const {
        villageId,
        ...input
      } = args.input;

      const queueManager = new BuildingQueueManager(villageId);
      queueManager.dequeueBuildingAtField(input);

      return true;
    },

    moveQueuedBuildingDown: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = new BuildingQueueManager(villageId);
      return queueManager.moveQueuedBuilding(queueId, MovingDirection.Down);
    },

    moveQueuedBuildingUp: (_, args) => {
      const {
        queueId,
        villageId,
      } = args.input;

      const queueManager = new BuildingQueueManager(villageId);
      return queueManager.moveQueuedBuilding(queueId, MovingDirection.Up);
    },
  }
};
