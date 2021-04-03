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

export const AutoMentorSettingsObject = objectType({
  name: 'AutoMentorSettings',
  definition: t => {
    t.boolean('acceptTaskRewards');
    t.boolean('acceptDailyRewards');
  },
});

export const UpdateAutoMentorSettingsInput = inputObjectType({
  name: 'UpdateAutoMentorSettingsInput',
  definition: t => {
    t.boolean('acceptTaskRewards');
    t.boolean('acceptDailyRewards');
  },
});

export const AutoMentorSettingsQuery = queryField(t => {
  t.field('autoMentorSettings', {
    type: AutoMentorSettingsObject,
    resolve: (_, _args, ctx) => ctx.settingsService.autoMentor.get(),
  });
});

export const UpdateAutoMentorSettingsMutation = mutationField(t => {
  t.field('updateAutoMentorSettings', {
    type: AutoMentorSettingsObject,
    args: {
      settings: arg({ type: UpdateAutoMentorSettingsInput }),
    },
    resolve: (_, args, ctx) => ctx.settingsService.autoMentor.merge(args.settings),
  });
});

export const ResetAutoMentorSettingsMutation = mutationField(t => {
  t.field('resetAutoMentorSettings', {
    type: AutoMentorSettingsObject,
    resolve: (_, _args, ctx) => ctx.settingsService.autoMentor.reset(),
  });
});

export const AutoMentorSettingsUpdatedSubscription = subscriptionField(t => {
  t.field('autoMentorSettingsUpdated', {
    type: AutoMentorSettingsObject,
    ...subscribeToEvent(
      BotEvent.AutoMentorSettingsUpdated,
      {
        resolve: (p) => p.settings,
      },
    ),
  });
});
