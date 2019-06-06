import { IResolvers } from '../../_types/graphql';

export const buildingResolvers: IResolvers = {
  Query: {
    buildings: (_, args, context) => context.buildingsService.getVillageBuildings(args.villageId),

    buildingQueue: (_, args, context) => context.buildingsService.getVillageBuildingQueue(args.villageId),
  },
  Mutation: {
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
