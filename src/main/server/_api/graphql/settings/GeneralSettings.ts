import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../../pubSub';
import { getGeneralSettingsService } from '../../../services/settings/general';

export const GeneralSettings = objectType({
  name: 'GeneralSettings',
  definition: t => {
    t.string('chromePath');
    t.boolean('headlessChrome');
  },
});

export const GeneralSettingsQuery = queryField(t => {
  t.field('generalSettings', {
    type: GeneralSettings,
    resolve: () => getGeneralSettingsService().get(),
  });
});

export const UpdateGeneralSettingsInput = inputObjectType({
  name: 'UpdateGeneralSettingsInput',
  definition: t => {
    t.string('chromePath');
    t.boolean('headlessChrome');
  },
});

export const UpdateGeneralSettingsMutation = mutationField(t => {
  t.field('updateGeneralSettings', {
    type: GeneralSettings,
    args: {
      settings: arg({ type: UpdateGeneralSettingsInput }),
    },
    resolve: (_, { settings }) =>
      getGeneralSettingsService().merge({
        ...settings,
        chromePath: settings.chromePath || undefined,
      }),
  });
});

export const ResetGeneralSettingsMutation = mutationField(t => {
  t.field('resetGeneralSettings', {
    type: GeneralSettings,
    resolve: () => getGeneralSettingsService().reset(),
  });
});

export const GeneralSettingsUpdatedSubscription = subscriptionField(t => {
  t.field('generalSettingsUpdated', {
    type: GeneralSettings,
    ...subscribeToEvent(BotEvent.GeneralSettingsUpdated, {
      resolve: (p) => p.settings,
    }),
  });
});