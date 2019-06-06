import { IBuildingSpot, IResolvers } from '../../_types/graphql';

export const buildingResolvers: IResolvers = {
  Query: {
    buildingSpots: (_, args, context) => {
      const villageId = +args.villageId;
      const spots = context.buildingsService.getBuildingSpots(villageId);
      const queued = context.buildingsService.getBuildingQueue(villageId);
      const inProgress = context.buildingsService.getBuildingsInProgress(villageId);

      return spots.map((b, index): IBuildingSpot => ({
        type: b.type,
        fieldId: index + 1,
        level: {
          actual: b.level,
          inProgress: inProgress.filter(bb => bb.fieldId === index + 1).length,
          queued: queued.filter(bb => bb.fieldId === index + 1).length,
        },
      }));
    },

    queuedBuildings: (_, args, context) => context.buildingsService
      .getBuildingQueue(+args.villageId)
      .map((b, index) => ({
        ...b,
        queueIndex: index,
      })),

    buildingsInProgress: (_, args, context) => context.buildingsService.getBuildingsInProgress(+args.villageId),
  },
  Mutation: {
    clearQueue: (_, args, context) => {
      context.buildingsService.clearQueue(+args.input.villageId);
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
