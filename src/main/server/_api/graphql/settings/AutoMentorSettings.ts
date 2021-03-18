import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { AutoMentorSettings } from '../../../_models/settings/autoMentorSettings.js';
import { getAccountContext } from '../../../accountContext.js';
import { completeTaskIds } from '../../../constants/completeTaskIds.js';
import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';

export const CompleteTasksSettings = objectType({
  name: 'CompleteTasksSettings',
  definition: t => {
    t.boolean('allow');
    t.list.string('taskIds', {
      resolve: () => [...completeTaskIds],
    });
    t.list.string('allowedTaskIds');
  },
});

export const AutoMentorSettingsObject = objectType({
  name: 'AutoMentorSettings',
  definition: t => {
    t.boolean('acceptTaskRewards');
    t.boolean('acceptDailyRewards');
    t.field('completeTasks', { type: CompleteTasksSettings });
  },
});

export const CompleteTasksSettingsInput = inputObjectType({
  name: 'CompleteTasksSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.list.string('taskIds');
    t.list.string('allowedTaskIds');
  },
});

export const UpdateAutoMentorSettingsInput = inputObjectType({
  name: 'UpdateAutoMentorSettingsInput',
  definition: t => {
    t.boolean('acceptTaskRewards');
    t.boolean('acceptDailyRewards');
    t.field('completeTasks', { type: CompleteTasksSettingsInput });
  },
});

const getService = () => getAccountContext().settingsService.autoMentor;

const mapResult = (result: AutoMentorSettings) => {
  return {
    ...result,
    completeTasks: {
      ...result.completeTasks,
      allowedTaskIds: [...result.completeTasks.allowedTaskIds],
    },
  };
}

export const AutoMentorSettingsQuery = queryField(t => {
  t.field('autoMentorSettings', {
    type: AutoMentorSettingsObject,
    resolve: () => mapResult(getService().get()),
  });
});

export const UpdateAutoMentorSettingsMutation = mutationField(t => {
  t.field('updateAutoMentorSettings', {
    type: AutoMentorSettingsObject,
    args: {
      settings: arg({ type: UpdateAutoMentorSettingsInput }),
    },
    resolve: (_, args) => mapResult(getService().merge(args.settings)),
  });
});

export const ResetAutoMentorSettingsMutation = mutationField(t => {
  t.field('resetAutoMentorSettings', {
    type: AutoMentorSettingsObject,
    resolve: () => mapResult(getService().reset()),
  });
});

export const AutoMentorSettingsUpdatedSubscription = subscriptionField(t => {
  t.field('autoMentorSettingsUpdated', {
    type: AutoMentorSettingsObject,
    ...subscribeToEvent(
      BotEvent.AutoMentorSettingsUpdated,
      {
        resolve: (p) => mapResult(p.settings),
      },
    ),
  });
});
