import { unitsService } from '../../services/unitsService';
import { Resolvers } from './_types';

export const unitResolvers: Resolvers = {
  Query: {
    unitInfo: (_, args) => unitsService.getUnitInfo(args.index),
  },
};