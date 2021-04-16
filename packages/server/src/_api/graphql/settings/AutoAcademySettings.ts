import {
  arg,
  idArg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
} from 'nexus';

export const AutoAcademySettingsObject = objectType({
  name: 'AutoAcademySettings',
  definition: t => {
    t.boolean('allow');
    t.boolean('useHeroResources');
    t.field('coolDown', { type: 'CoolDown' });
    t.list.int('units');
  },
});

export const AutoAcademySettingsQuery = queryField(t => {
  t.field('autoAcademySettings', {
    type: AutoAcademySettingsObject,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) =>
      ctx.settingsService.village(villageId).autoAcademy.get(),
  });
});

export const AutoAcademySettingsInput = inputObjectType({
  name: 'AutoAcademySettingsInput',
  definition: t => {
    t.boolean('allow');
    t.boolean('useHeroResources');
    t.field('coolDown', { type: 'CoolDownInput' });
    t.list.int('units');
  },
});

export const UpdateAutoAcademySettingsMutation = mutationField(t => {
  t.field('updateAutoAcademySettings', {
    type: AutoAcademySettingsObject,
    args: {
      villageId: idArg(),
      settings: arg({ type: AutoAcademySettingsInput }),
    },
    resolve: (_, { villageId, settings }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoAcademy;

      service.update(settings);

      return settings;
    },
  });
});

export const ResetAutoAcademySettingsMutation = mutationField(t => {
  t.field('resetAutoAcademySettings', {
    type: AutoAcademySettingsObject,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoAcademy;

      service.reset();

      return service.get();
    },
  });
});