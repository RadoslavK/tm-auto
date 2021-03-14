import {
  intArg,
  objectType,
  queryField,
} from 'nexus';
import { unitInfoService } from '../../services/info/unitInfoService';

export const UnitInfo = objectType({
  name: 'UnitInfo',
  definition: t => {
    t.string('name');
  },
});

export const UnitInfoQuery = queryField(t => {
  t.field('unitInfo', {
    type: UnitInfo,
    args: {
      index: intArg(),
    },
    resolve: (_, args) => unitInfoService.getUnitInfo(args.index),
  });
});
