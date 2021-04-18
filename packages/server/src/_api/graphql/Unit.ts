import {
  intArg,
  objectType,
  queryField,
} from 'nexus';

import { AccountContext } from '../../accountContext.js';

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

export const ResearcheableUnitsQuery = queryField(t => {
  t.list.int('researcheableUnits', {
    resolve: () => {
      const { tribe } = AccountContext.getContext().gameInfo;
      //  1st unit and chief, settlers can not be researched
      const indexes = [2, 3, 4, 5, 6, 7, 8];

      return indexes.map(i => (tribe - 1) * 10 + i);
    },
  });
});

export const UpgradeableUnitsQuery = queryField(t => {
  t.list.int('upgradeableUnits', {
    resolve: () => {
      const { tribe } = AccountContext.getContext().gameInfo;
      const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      return indexes.map(i => (tribe - 1) * 10 + i);
    },
  });
});

export const UnitUpgradeCostQuery = queryField(t => {
  t.field('unitUpgradeCost', {
    type: 'Resources',
    args: {
      unitIndex: intArg(),
      level: intArg(),
    },
    resolve: (_, { unitIndex, level }, ctx) =>
      ctx.unitUpgradeCostService.getUpgradeCost(unitIndex, level),
  });
});