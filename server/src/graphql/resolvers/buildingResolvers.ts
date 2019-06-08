import { BuildingType } from '../../_enums/BuildingType';
import { Cost } from '../../_models/misc/cost';
import { IBuildingInProgress, IQueuedBuilding, IResolvers } from '../../_types/graphql';
import { buildingNames } from '../../constants/buildingNames';
import { buildingInfos } from '../../index';
import { formatTimeFromSeconds } from '../../utils/formatTime';

export const buildingResolvers: IResolvers = {
  Query: {
    buildingSpots: (_, args, context) => {
      const { villageId } = args;
      const normalizedSpots = context.buildingsService.normalizedBuildingSpots(villageId);

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

    buildingQueue: (_, args, context) => {
      let totalSeconds = 0;
      const totalCost: Cost = new Cost();

      const buildings = context.buildingsService
        .getBuildingQueue(args.villageId)
        .buildings()
        .map((b, index): IQueuedBuilding => {
          const buildingInfo = buildingInfos[b.type][b.level - 1];
          totalSeconds += buildingInfo.buildingTime;
          totalCost.add(buildingInfo.cost);

          return {
            cost: {
              ...buildingInfo.cost.resources,
              total: buildingInfo.cost.resources.total(),
              freeCrop: buildingInfo.cost.freeCrop,
            },
            level: b.level,
            name: buildingNames[b.type],
            queueIndex: index,
            time: formatTimeFromSeconds(buildingInfo.buildingTime),
            type: b.type,
          };
        });

      const totalBuildingTime = formatTimeFromSeconds(totalSeconds);

      return {
        buildings,
        totalBuildingTime,
        totalCost: {
          ...totalCost.resources,
          total: totalCost.resources.total(),
          freeCrop: totalCost.freeCrop,
        },
      }
    },

    buildingsInProgress: (_, args, context) => context.buildingsService.getBuildingsInProgress(args.villageId).map((b): IBuildingInProgress => {
      return {
        level: b.level,
        type: b.type,
        time: formatTimeFromSeconds(b.timer),
      };
    }),

    availableNewBuildings: (_, args, context) => context.buildingsService.availableNewBuildings(args.input),
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