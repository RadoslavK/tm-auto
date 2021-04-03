import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
} from 'nexus';

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
    resolve: (_, _args, ctx) => ctx.generalSettingsService.get(),
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
    resolve: (_, { settings }, ctx) =>
      ctx.generalSettingsService.merge({
        ...settings,
        chromePath: settings.chromePath || undefined,
      }),
  });
});

export const ResetGeneralSettingsMutation = mutationField(t => {
  t.field('resetGeneralSettings', {
    type: GeneralSettings,
    resolve: (_, _args, ctx) => ctx.generalSettingsService.reset(),
  });
});