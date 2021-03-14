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

export const GeneralVillageSettings = objectType({
  name: 'GeneralVillageSettings',
  definition: t => {
    t.boolean('allowTasks');
  },
});

export const UpdateGeneralVillageSettingsInput = inputObjectType({
  name: 'UpdateGeneralVillageSettingsInput',
  definition: t => {
    t.boolean('allowTasks');
  },
});

const getService = (villageId: string) =>
  getAccountContext().settingsService.village(villageId).general;

export const GeneralVillageSettingsQuery = queryField(t => {
  t.field('generalVillageSettings', {
    type: GeneralVillageSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args) => getService(args.villageId).get(),
  });
});

export const UpdateGeneralVillageSettingsMutation = mutationField(t => {
  t.field('updateGeneralVillageSettings', {
    type: GeneralVillageSettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateGeneralVillageSettingsInput }),
    },
    resolve: (_, args) =>
      getService(args.villageId).merge(args.settings),
  });
});

export const ResetGeneralVillageSettingsMutation = mutationField(t => {
  t.field('resetGeneralVillageSettings', {
    type: GeneralVillageSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args) =>
      getService(args.villageId).reset(),
  });
});

export const GeneralVillageSettingsUpdatedSubscription = subscriptionField(t => {
  t.field('generalVillageSettingsUpdated', {
    type: GeneralVillageSettings,
    args: {
      villageId: 'ID',
    },
    ...subscribeToEvent(
      BotEvent.GeneralVillageSettingsUpdated,
      {
        filter: (p, args) => p.villageId === args.villageId,
        resolve: (p) => p.settings,
      },
    ),
  });
});
