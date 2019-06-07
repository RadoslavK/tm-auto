import { BuildingType } from '../../_enums/BuildingType';
import { IBuildingSpot, IQueuedBuilding, IResolvers } from '../../_types/graphql';
import { buildingNames } from '../../constants/buildingNames';

export const buildingResolvers: IResolvers = {
  Query: {
    buildingSpots: (_, args, context) => {
      const { villageId } = args;
      const spots = context.buildingsService.getBuildingSpots(villageId);
      const queue = context.buildingsService.getBuildingQueue(villageId);
      const inProgress = context.buildingsService.getBuildingsInProgress(villageId);

      const normalizedSpots = spots.map((b, index): IBuildingSpot => {
        const queued = queue.buildings().filter(bb => bb.fieldId === index + 1);

        return {
          type: b.type || (queued.length > 0 ? queued[0].type : b.type),
          fieldId: index + 1,
          level: {
            actual: b.level,
            inProgress: inProgress.filter(bb => bb.fieldId === index + 1).length,
            queued: queued.length,
          },
        };
      });

      return {
        infrastructure: normalizedSpots.filter(s => s.type > BuildingType.Crop),
        resources: {
          wood: normalizedSpots.filter(s => s.type === BuildingType.Wood),
          clay: normalizedSpots.filter(s => s.type === BuildingType.Clay),
          iron: normalizedSpots.filter(s => s.type === BuildingType.Iron),
          crop: normalizedSpots.filter(s => s.type === BuildingType.Crop),
        }
      }
    },

    queuedBuildings: (_, args, context) => {
      return context.buildingsService
        .getBuildingQueue(args.villageId)
        .buildings()
        .map((b, index): IQueuedBuilding => ({
          name: buildingNames[b.type],
          level: b.level,
          queueIndex: index,
        }))
    },

    buildingsInProgress: (_, args, context) => context.buildingsService.getBuildingsInProgress(args.villageId),

    availableNewBuildings: (_, args, context) => {
      return [
        { type: BuildingType.RallyPoint, imageLink: 'https://t4.answers.travian.com/images/gp/g/big/g11-ltr.png', name: buildingNames[BuildingType.RallyPoint] },
        { type: BuildingType.TownHall, imageLink: 'https://t4.answers.travian.com/images/gp/g/big/g11-ltr.png', name: buildingNames[BuildingType.TownHall] },
        { type: BuildingType.Bakery, imageLink: 'https://t4.answers.travian.com/images/gp/g/big/g11-ltr.png', name: buildingNames[BuildingType.Bakery] },
      ]
    },
  },
  Mutation: {
    clearQueue: (_, args, context) => {
      context.buildingsService.clearQueue(args.villageId);
      return true;
    },

    enqueueBuilding: (_, args, context) => {
      context.buildingsService.enqueueBuilding(args.input);
      return true;
    },

    dequeueBuilding: (_, args, context) => {
      context.buildingsService.dequeueBuilding(args.input);
      return true;
    },
  }
};
