import {
  arg,
  idArg,
  inputObjectType,
  intArg,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import path from 'path';
import { getDirname } from 'shared/utils/getDirname.js';

import type {
  AutoSmithyUnitLevelSettings,
  AutoSmithyUnitSettings,
} from '../../../_models/settings/tasks/autoSmithySettings.js';
import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';

export const AutoSmithyUnitLevelSettingsObject = objectType({
  name: 'AutoSmithyUnitLevelSettings',
  definition: t => {
    t.int('targetLevel');
    t.int('minTroops');
  },
});

export const AutoSmithyUnitSettingsObject = objectType({
  name: 'AutoSmithyUnitSettings',
  definition: t => {
    t.int('unitIndex');
    t.list.field('levels', { type: AutoSmithyUnitLevelSettingsObject });
  },
});

export const AutoSmithySettingsObject = objectType({
  name: 'AutoSmithySettings',
  definition: t => {
    t.boolean('allow');
    t.boolean('useHeroResources');
    t.field('coolDown', { type: 'CoolDown' });
    t.list.field('units', { type: AutoSmithyUnitSettingsObject });
  },
  sourceType: process.env.shouldGenerateArtifacts && {
    module: path.join(getDirname(import.meta), '../../../_models/settings/tasks/autoSmithySettings.ts'),
    export: 'AutoSmithySettings',
  },
});

export const AutoSmithyQuery = queryField(t => {
  t.field('autoSmithySettings', {
    type: AutoSmithySettingsObject,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) =>
      ctx.settingsService.village(villageId).autoSmithy.get(),
  });
});

export const AutoSmithySettingsInput = inputObjectType({
  name: 'AutoSmithySettingsInput',
  definition: t => {
    t.boolean('allow');
    t.boolean('useHeroResources');
    t.field('coolDown', { type: 'CoolDownInput' });
  },
});

export const UpdateAutoSmithySettingsMutation = mutationField(t => {
  t.field('updateAutoSmithySettings', {
    type: AutoSmithySettingsObject,
    args: {
      villageId: idArg(),
      settings: arg({ type: AutoSmithySettingsInput }),
    },
    resolve: (_, { villageId, settings }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoSmithy;

      return service.merge(settings);
    },
  });
});

export const ResetAutoSmithySettingsUnitsMutation = mutationField(t => {
  t.field('resetAutoSmithySettingsUnits', {
    type: AutoSmithySettingsObject,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoSmithy;

      return service.merge({ units: [] });
    },
  });
});

export const ResetAutoSmithySettingsMutation = mutationField(t => {
  t.field('resetAutoSmithySettings', {
    type: AutoSmithySettingsObject,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoSmithy;

      service.reset();

      return service.get();
    },
  });
});

export const ClearAutoSmithySettingsUnitMutation = mutationField(t => {
  t.field('clearAutoSmithySettingsUnit', {
    type: AutoSmithySettingsObject,
    args: {
      villageId: idArg(),
      unitIndex: intArg(),
    },
    resolve: (_, { villageId, unitIndex }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoSmithy;
      const { units } = service.get();
      const newUnits = units.filter(u => u.unitIndex !== unitIndex);

      return service.merge({ units: newUnits });
    },
  });
});

export const AddAutoSmithyUnitLevelMutation = mutationField(t => {
  t.field('addAutoSmithyUnitLevel', {
    type: AutoSmithySettingsObject,
    args: {
      villageId: idArg(),
      unitIndex: intArg(),
      targetLevel: intArg(),
      minTroops: intArg(),
    },
    resolve: (_, { villageId, unitIndex, targetLevel, minTroops }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoSmithy;
      const { units } = service.get();
      const unit = units.find(u => u.unitIndex === unitIndex);
      const newLevel: AutoSmithyUnitLevelSettings = { targetLevel, minTroops };

      if (!unit) {
        const newUnits = [...units, { unitIndex, levels: [newLevel] } as AutoSmithyUnitSettings];
        return service.merge({ units: newUnits });
      }

      const newLevels = [...unit.levels, newLevel];
      const newUnits = units.map(u => u === unit ? { ...u, levels: newLevels } : u);

      return service.merge({ units: newUnits });
    },
  });
});

export const RemoveAutoSmithyUnitLevelMutation = mutationField(t => {
  t.field('removeAutoSmithyUnitLevel', {
    type: AutoSmithySettingsObject,
    args: {
      villageId: idArg(),
      unitIndex: intArg(),
      targetLevel: intArg(),
    },
    resolve: (_, { villageId, unitIndex, targetLevel }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoSmithy;
      const { units } = service.get();
      const unit = units.find(u => u.unitIndex === unitIndex);

      if (!unit) {
        return service.get();
      }

      const newLevels = unit.levels.filter(l => l.targetLevel !== targetLevel);
      const newUnits = units
        .map(u => u === unit ? { ...u, levels: newLevels } : u)
        .filter(u => u.levels.length > 0);

      return service.merge({ units: newUnits });
    },
  });
});

export const AutoSmithySettingsSubscription = subscriptionField(t => {
  t.field('autoSmithySettingsUpdated', {
    type: AutoSmithySettingsObject,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.AutoSmithySettingsUpdated, {
      filter: (p, args) => p.villageId === args.villageId,
      resolve: (p) => p.settings,
    }),
  });
});

export const AutoSmithySettingsUnitUpdatedSubscription = subscriptionField(t => {
  t.field('autoSmithySettingsUnitUpdated', {
    type: AutoSmithyUnitSettingsObject,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.AutoSmithySettingsUnitUpdated, {
      filter: (p, args) => p.villageId === args.villageId,
      resolve: (p) => p.unitSettings,
    }),
  });
});

export const AutoSmithySettingsUnitRemovedSubscription = subscriptionField(t => {
  t.field('autoSmithySettingsUnitRemoved', {
    type: AutoSmithyUnitSettingsObject,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.AutoSmithySettingsUnitRemoved, {
      filter: (p, args) => p.villageId === args.villageId,
      resolve: (p) => p.unitSettings,
    }),
  });
});