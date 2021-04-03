import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
} from 'nexus';

export const AutoPartySettings = objectType({
  name: 'AutoPartySettings',
  definition: t => {
    t.field('coolDown', { type: 'CoolDown' });
    t.boolean('allowSmall');
    t.boolean('allowLarge');
    t.boolean('useHeroResources');

    t.int('minCulturePointsSmall');
    t.int('minCulturePointsLarge');
  },
});

export const UpdateAutoPartySettingsInput = inputObjectType({
  name: 'UpdateAutoPartySettingsInput',
  definition: t => {
    t.boolean('allowSmall');
    t.boolean('allowLarge');
    t.field('coolDown', { type: 'CoolDownInput' });
    t.boolean('useHeroResources');

    t.int('minCulturePointsSmall');
    t.int('minCulturePointsLarge');
  },
});

export const AutoPartySettingsQuery = queryField(t => {
  t.field('autoPartySettings', {
    type: AutoPartySettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).autoParty.get(),
  });
});

export const UpdateAutoPartySettingsMutation = mutationField(t => {
  t.field('updateAutoPartySettings', {
    type: AutoPartySettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateAutoPartySettingsInput }),
    },
    resolve: (_, args, ctx) =>
      ctx.settingsService.village(args.villageId).autoParty.merge(args.settings),
  });
});

export const ResetAutoPartySettingsMutation = mutationField(t => {
  t.field('resetAutoPartySettings', {
    type: AutoPartySettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).autoParty.reset(),
  });
});