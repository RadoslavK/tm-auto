import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';

import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';

export const VideoFeatureSettings = objectType({
  name: 'VideoFeatureSettings',
  definition: t => {
    t.boolean('allow');
    t.field('minBuildTime', { type: 'Duration' });
  },
});

export const GlobalAutoBuildSettings = objectType({
  name: 'GlobalAutoBuildSettings',
  definition: t => {
    t.boolean('allow');
    t.field('videoFeature', { type: VideoFeatureSettings });
  },
});

export const AccountSettings = objectType({
  name: 'AccountSettings',
  definition: t => {
    t.boolean('allowTasks');
    t.field('tasksCoolDown', { type: 'CoolDown' });
    t.boolean('autoStart');
    t.field('autoBuild', { type: GlobalAutoBuildSettings });
    t.boolean('autoUnits');
    t.boolean('autoParty');
  },
});

export const VideoFeatureSettingsInput = inputObjectType({
  name: 'VideoFeatureSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.field('minBuildTime', { type: 'DurationInput' });
  },
});

export const GlobalAutoBuildSettingsInput = inputObjectType({
  name: 'GlobalAutoBuildSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.field('videoFeature', { type: VideoFeatureSettingsInput });
  },
});

export const UpdateAccountSettingsInput = inputObjectType({
  name: 'UpdateAccountSettingsInput',
  definition: t => {
    t.boolean('allowTasks');
    t.field('tasksCoolDown', { type: 'CoolDownInput' });
    t.field('autoBuild', { type: GlobalAutoBuildSettingsInput });
    t.boolean('autoUnits');
    t.boolean('autoStart');
    t.boolean('autoParty');
  },
});

export const AccountSettingsQuery = queryField(t => {
  t.field('accountSettings', {
    type: AccountSettings,
    resolve: (_, _args, ctx) => ctx.settingsService.account.get(),
  });
});

export const UpdateAccountSettingsMutation = mutationField(t => {
  t.field('updateAccountSettings', {
    type: AccountSettings,
    args: {
      settings: arg({ type: UpdateAccountSettingsInput }),
    },
    resolve: (_, args, ctx) =>
      ctx.settingsService.account.merge(args.settings),
  });
});

export const ResetAccountSettingsMutation = mutationField(t => {
  t.field('resetAccountSettings', {
    type: AccountSettings,
    resolve: (_, _args, ctx) =>
      ctx.settingsService.account.reset(),
  });
});

export const AccountSettingsUpdatedSubscription = subscriptionField(t => {
  t.field('accountSettingsUpdated', {
    type: AccountSettings,
    ...subscribeToEvent(BotEvent.AccountSettingsUpdated, {
      resolve: (p) => p.settings,
    }),
  });
});
