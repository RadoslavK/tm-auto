import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
} from 'nexus';

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

export const GeneralVillageSettingsQuery = queryField(t => {
  t.field('generalVillageSettings', {
    type: GeneralVillageSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).general.get(),
  });
});

export const UpdateGeneralVillageSettingsMutation = mutationField(t => {
  t.field('updateGeneralVillageSettings', {
    type: GeneralVillageSettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateGeneralVillageSettingsInput }),
    },
    resolve: (_, args, ctx) =>
      ctx.settingsService.village(args.villageId).general.merge(args.settings),
  });
});

export const ResetGeneralVillageSettingsMutation = mutationField(t => {
  t.field('resetGeneralVillageSettings', {
    type: GeneralVillageSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) =>
      ctx.settingsService.village(args.villageId).general.reset(),
  });
});