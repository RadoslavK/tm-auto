import {
  arg,
  idArg,
  inputObjectType,
  list,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { join } from 'path';
import { getDirname } from 'shared/utils/getDirname.js';

import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';

export const UseHeroResourcesVillageSettingsObject = objectType({
  name: 'UseHeroResourcesVillageSettings',
  definition: t => {
    t.boolean('wood');
    t.boolean('clay');
    t.boolean('iron');
    t.boolean('crop');
  },
});

export const GeneralVillageSettings = objectType({
  name: 'GeneralVillageSettings',
  definition: t => {
    t.boolean('allowTasks');
    t.field('useHeroResources', { type: UseHeroResourcesVillageSettingsObject });
    t.list.field('tasksOrder', { type: 'VillageTaskType' });
  },
  sourceType: process.env.shouldGenerateArtifacts && {
    module: join(getDirname(import.meta), '../../../_models/settings/generalVillageSettings.ts'),
    export: 'GeneralVillageSettings',
  },
});

export const UseHeroResourcesVillageSettingsInput = inputObjectType({
  name: 'UseHeroResourcesVillageSettingsInput',
  definition: t => {
    t.boolean('wood');
    t.boolean('clay');
    t.boolean('iron');
    t.boolean('crop');
  },
});

export const UpdateGeneralVillageSettingsInput = inputObjectType({
  name: 'UpdateGeneralVillageSettingsInput',
  definition: t => {
    t.boolean('allowTasks');
    t.field('useHeroResources', { type: UseHeroResourcesVillageSettingsInput });
  },
});

export const GeneralVillageSettingsQuery = queryField(t => {
  t.field('generalVillageSettings', {
    type: GeneralVillageSettings,
    args: {
      villageId: idArg(),
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).general.get(),
  });
});

export const UpdateGeneralVillageSettingsMutation = mutationField(t => {
  t.field('updateGeneralVillageSettings', {
    type: GeneralVillageSettings,
    args: {
      villageId: idArg(),
      settings: arg({ type: UpdateGeneralVillageSettingsInput }),
    },
    resolve: (_, args, ctx) =>
      ctx.settingsService.village(args.villageId).general.merge(args.settings),
  });
});

export const UpdateGeneralVillageSettingsOrderMutation = mutationField(t => {
  t.field('updateGeneralVillageSettingsOrder', {
    type: GeneralVillageSettings,
    args: {
      villageId: idArg(),
      order: list(arg({ type: 'VillageTaskType' })),
    },
    resolve: (_, { villageId, order }, ctx) =>
      ctx.settingsService.village(villageId).general.merge({ tasksOrder: order }),
  });
});

export const ResetGeneralVillageSettingsMutation = mutationField(t => {
  t.field('resetGeneralVillageSettings', {
    type: GeneralVillageSettings,
    args: {
      villageId: idArg(),
    },
    resolve: (_, args, ctx) =>
      ctx.settingsService.village(args.villageId).general.reset(),
  });
});

export const GeneralVillageSettingsUpdatedSubscription = subscriptionField(t => {
  t.field('generalVillageSettingsUpdated', {
    type: GeneralVillageSettings,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.GeneralVillageSettingsUpdated, {
      filter: (p, { villageId }) => p.villageId === villageId,
      resolve: (p) => p.generalVillageSettings,
    }),
  });
});