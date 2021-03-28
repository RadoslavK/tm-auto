import {
  arg,
  enumType,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
} from 'nexus';
import { DualQueuePreferences } from 'server/_models/settings/tasks/autoBuildSettings/index.js';
import { getAccountContext } from '../../../accountContext.js';

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

const getService = (villageId: string) =>
  getAccountContext().settingsService.village(villageId).autoBuild;

export const AutoBuildSettingQuery = queryField(t => {
  t.field('autoBuildSettings', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args) => getService(args.villageId).get(),
  });
});

export const UpdateAutoBuildSettingsMutation = mutationField(t => {
  t.field('updateAutoBuildSettings', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateAutoBuildSettingsInput }),
    },
    resolve: (_, args) =>
      getService(args.villageId).merge(args.settings),
  });
});

export const ResetAutoBuildSettingsMutation = mutationField(t => {
  t.field('resetAutoBuildSettings', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args) => getService(args.villageId).reset(),
  });
});
