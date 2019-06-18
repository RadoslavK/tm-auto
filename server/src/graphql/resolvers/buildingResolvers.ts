import { BuildingType } from '../../_enums/BuildingType';
import { Tribe } from '../../_enums/Tribe';
import { IBuildingQueue, IBuildingSpotLevel, IResolvers } from '../../_types/graphql';
import { fieldIds } from '../../constants/fieldIds';
import { buildingInfos } from '../../index';
import { AvailableBuildingTypesService } from '../../services/availableBuildingTypesService';
import { BuildingQueueService, MovingDirection } from '../../services/buildingQueueService';
import { context } from '../context';
import { mapAvailableNewBuilding } from '../mappers/mapAvailableNewBuilding';
import { mapBuildingInProgress } from '../mappers/mapBuildingInProgress';
import { mapBuildingQueueFactory } from '../mappers/mapBuildingQueue';
import { Events } from '../subscriptions/events';
import { pubSub } from '../subscriptions/pubSub';

const getWallType = (): BuildingType => {
  switch (context.player.tribe) {
    case Tribe.Egyptians:
      return BuildingType.StoneWall;

    case Tribe.Romans:
      return BuildingType.CityWall;

    case Tribe.Teutons:
      return BuildingType.EarthWall;

    case Tribe.Gauls:
      return BuildingType.Palisade;

    case Tribe.Huns:
      return BuildingType.MakeshiftWall;
  }
};

export const buildingResolvers: IResolvers = {
  Query: {
    buildingSpots: (_, args) => {
      const { villageId } = args;
      const normalizedSpots = context.villages.village(villageId).buildings.normalizedBuildingSpots();

      normalizedSpots.forEach(b => {
        if (b.type > BuildingType.None) {
          return;
        }

        if (b.fieldId === fieldIds.RallyPoint) {
          (b.type as BuildingType) = BuildingType.RallyPoint;
          (b.level as IBuildingSpotLevel) = {
            total: 0,
            queued: 0,
            actual: 0,
            ongoing: 0,
            max: buildingInfos[b.type].maxLevel,
          }
        } else if (b.fieldId === fieldIds.Wall) {
          (b.type as BuildingType) = getWallType();
          (b.level as IBuildingSpotLevel) = {
            total: 0,
            queued: 0,
            actual: 0,
            ongoing: 0,
            max: buildingInfos[b.type].maxLevel,
          }
        }
      });

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
      const queue = village.buildings.queue;
      const queueService = new BuildingQueueService(villageId);
      const mapBuildingQueue = mapBuildingQueueFactory(queueService);

      return mapBuildingQueue(queue);
    },

    buildingsInProgress: (_, args) => context.villages.village(args.villageId).buildings.ongoing.buildings().map(mapBuildingInProgress),

    availableNewBuildings: (_, args) => {
      const {
        fieldId,
        villageId,
      } = args.input;

      const manager = new AvailableBuildingTypesService(villageId);
      return manager.availableBuildingTypes(fieldId).map(mapAvailableNewBuilding);
    },
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

      await pubSub.publish('TEST', {  lolo: 6 });
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
  },

  Subscription: {
    buildingsUpdated: {
      subscribe: () => pubSub.asyncIterator(Events.BuildingsUpdated),
      resolve: () => true,
    },
  },
};
