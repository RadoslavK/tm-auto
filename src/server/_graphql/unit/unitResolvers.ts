import { Resolvers } from '../../_types/resolvers.type';
import { unitInfoService } from '../../services/info/unitInfoService';

export default <Resolvers>{
  Query: {
    unitInfo: (_, args) => unitInfoService.getUnitInfo(args.index),
  },
};
