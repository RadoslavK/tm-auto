import { Resolvers } from './_types';
import { unitsService } from '../../services/unitsService';

export const unitResolvers: Resolvers = {
  Query: {
    unitInfo: (_, args) => unitsService.getUnitInfo(args.index),
  },
};