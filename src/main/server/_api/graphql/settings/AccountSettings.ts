import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { getAccountContext } from '../../../accountContext';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../../pubSub';

export const AccountSettings = objectType({
  name: 'AccountSettings',
  definition: t => {
    t.boolean('allowTasks');
    t.field('tasksCoolDown', { type: 'CoolDown' });
    t.boolean('autoStart');
    t.boolean('autoBuild');
    t.boolean('autoUnits');
    t.boolean('autoParty');
  },
});

export const UpdateAccountSettingsInput = inputObjectType({
  name: 'UpdateAccountSettingsInput',
  definition: t => {
    t.boolean('allowTasks');
    t.field('tasksCoolDown', { type: 'CoolDownInput' });
    t.boolean('autoBuild');
    t.boolean('autoUnits');
    t.boolean('autoStart');
    t.boolean('autoParty');
  },
});

export const AccountSettingsQuery = queryField(t => {
  t.field('accountSettings', {
    type: AccountSettings,
    resolve: () => getAccountContext().settingsService.account.get(),
  });
});

export const UpdateAccountSettingsMutation = mutationField(t => {
  t.field('updateAccountSettings', {
    type: AccountSettings,
    args: {
      settings: arg({ type: UpdateAccountSettingsInput }),
    },
    resolve: (_, args) =>
      getAccountContext().settingsService.account.merge(args.settings),
  });
});

export const ResetAccountSettingsMutation = mutationField(t => {
  t.field('resetAccountSettings', {
    type: AccountSettings,
    resolve: () =>
      getAccountContext().settingsService.account.reset(),
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
