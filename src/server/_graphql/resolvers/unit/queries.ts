import { Resolvers } from '../../_types';
import { unitInfoService } from '../../../services/info/unitInfoService';

export default <Resolvers>{
  Query: {
    unitInfo: (_, args) => unitInfoService.getUnitInfo(args.index),
  },
};