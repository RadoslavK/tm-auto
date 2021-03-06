import {
  idArg,
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

export const ResearcheableUnitsQuery = queryField(t => {
  t.list.int('researcheableUnits', {
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) => {
      const { tribe } = ctx.villageService.village(villageId);
      //  1st unit and settlers can not be researched
      const indexes = [2, 3, 4, 5, 6, 7, 8, 9];

      return indexes.map(i => (tribe - 1) * 10 + i);
    },
  });
});

export const UpgradeableUnitsQuery = queryField(t => {
  t.list.int('upgradeableUnits', {
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) => {
      const { tribe } = ctx.villageService.village(villageId);
      //  chiefs and settlers can not be upgraded
      const indexes = [1, 2, 3, 4, 5, 6, 7, 8];

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