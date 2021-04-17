import {
  arg,
  idArg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import path from 'path';
import { getDirname } from 'shared/utils/getDirname.js';

import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';

export const AutoSmithyUnitLevelSettingsObject = objectType({
  name: 'AutoSmithyUnitLevelSettings',
  definition: t => {
    t.int('targetLevel');
    t.nullable.int('minTroops');
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

export const AutoSmithyUnitLevelSettingsInput = inputObjectType({
  name: 'AutoSmithyUnitLevelSettingsInput',
  definition: t => {
    t.int('targetLevel');
    t.nullable.int('minTroops');
  },
});

export const AutoSmithyUnitSettingsInput = inputObjectType({
  name: 'AutoSmithyUnitSettingsInput',
  definition: t => {
    t.int('unitIndex');
    t.list.field('levels', { type: AutoSmithyUnitLevelSettingsInput });
  },
});

export const AutoSmithySettingsInput = inputObjectType({
  name: 'AutoSmithySettingsInput',
  definition: t => {
    t.boolean('allow');
    t.boolean('useHeroResources');
    t.field('coolDown', { type: 'CoolDownInput' });
    t.list.field('units', { type: AutoSmithyUnitSettingsInput });
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