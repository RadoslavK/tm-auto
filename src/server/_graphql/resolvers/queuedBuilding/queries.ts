import { Resolvers } from '../../_types';
import { BuildingQueue } from '../../../_types/graphql';
import { accountContext } from '../../../accountContext';
import { BuildingQueueService } from '../../../services/buildingQueueService';
import { mapBuildingQueueFactory } from '../../mappers/mapBuildingQueue';

export default <Resolvers> {
  Query: {
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
  },
};