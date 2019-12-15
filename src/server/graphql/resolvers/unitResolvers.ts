import { unitInfoService } from '../../services/info/unitInfoService';
import { Resolvers } from './_types';

export const unitResolvers: Resolvers = {
  Query: {
    unitInfo: (_, args) => unitInfoService.getUnitInfo(args.index),
  },
};
