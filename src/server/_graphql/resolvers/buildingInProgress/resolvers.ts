import { Resolvers } from '../../_types';
import { buildingInfoService } from '../../../services/info/buildingInfoService';

export default <Resolvers> {
  BuildingInProgress: {
    finishedAt: b => ({
      totalSeconds: Math.floor(b.finishedAt.valueOf() / 1000),
    }),
    name: b => buildingInfoService.getBuildingInfo(b.type).name,
  },
};