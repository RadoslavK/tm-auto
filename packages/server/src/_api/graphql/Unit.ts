import {
  intArg,
  objectType,
  queryField,
} from 'nexus';

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
    resolve: (_, args, ctx) => ctx.unitInfoService.getUnitInfo(args.index),
  });
});
