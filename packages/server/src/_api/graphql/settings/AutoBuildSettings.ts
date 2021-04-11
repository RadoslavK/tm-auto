import {
  arg,
  enumType,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { DualQueuePreferences } from 'server/_models/settings/tasks/autoBuildSettings/index.js';

import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';

export const AutoStorageOptionSettings = objectType({
  name: 'AutoStorageOptionSettings',
  definition: t => {
    t.boolean('allow');
    t.int('overflowLevel');
  },
});

export const UpdateAutoStorageOptionSettingsInput = inputObjectType({
  name: 'UpdateAutoStorageOptionSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.int('overflowLevel');
  },
});

export const AutoStorageSettings = objectType({
  name: 'AutoStorageSettings',
  definition: t => {
    t.boolean('allowFreeSpots');
    t.field('granary', { type: AutoStorageOptionSettings });
    t.field('warehouse', { type: AutoStorageOptionSettings });
  },
});

export const UpdateAutoStorageSettingsInput = inputObjectType({
  name: 'UpdateAutoStorageSettingsInput',
  definition: t => {
    t.boolean('allowFreeSpots');
    t.field('granary', { type: UpdateAutoStorageOptionSettingsInput });
    t.field('warehouse', { type: UpdateAutoStorageOptionSettingsInput });
  },
});

const DualQueuePreferenceEnum = enumType({
  name: "DualQueuePreference",
  members: DualQueuePreferences,
});

export const DualQueueSettings = objectType({
  name: 'DualQueueSettings',
  definition: t => {
    t.boolean('allow');
    t.field('preference', { type: DualQueuePreferenceEnum });
  },
});

export const DualQueueSettingsInput = inputObjectType({
  name: 'DualQueueSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.field('preference', { type: DualQueuePreferenceEnum });
  },
});

export const AutoBuildSettings = objectType({
  name: 'AutoBuildSettings',
  definition: t => {
    t.boolean('allow');
    t.field('coolDown', { type: 'CoolDown' });
    t.boolean('autoCropFields');
    t.int('minCrop');
    t.boolean('useHeroResources');
    t.field('dualQueue', { type: DualQueueSettings });

    t.field('autoStorage', { type: AutoStorageSettings });
  },
});

export const UpdateAutoBuildSettingsInput = inputObjectType({
  name: 'UpdateAutoBuildSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.field('coolDown', { type: 'CoolDownInput' });
    t.boolean('autoCropFields');
    t.int('minCrop');
    t.boolean('useHeroResources');
    t.field('dualQueue', { type: DualQueueSettingsInput });

    t.field('autoStorage', { type: UpdateAutoStorageSettingsInput });
  },
});

export const AutoBuildSettingQuery = queryField(t => {
  t.field('autoBuildSettings', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).autoBuild.get(),
  });
});

export const UpdateAutoBuildSettingsMutation = mutationField(t => {
  t.field('updateAutoBuildSettings', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateAutoBuildSettingsInput }),
    },
    resolve: (_, args, ctx) =>
      ctx.settingsService.village(args.villageId).autoBuild.merge(args.settings),
  });
});

export const ResetAutoBuildSettingsMutation = mutationField(t => {
  t.field('resetAutoBuildSettings', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).autoBuild.reset(),
  });
});

export const AutoBuildSettingsSubscription = subscriptionField(t => {
  t.field('autoBuildSettingsUpdated', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
    },
    ...subscribeToEvent(BotEvent.AutoBuildSettingsUpdated, {
      filter: (p, args) => p.villageId === args.villageId,
      resolve: (p) => p.settings,
    }),
  });
});
