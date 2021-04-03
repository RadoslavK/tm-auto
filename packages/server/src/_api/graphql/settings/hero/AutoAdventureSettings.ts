import {
  arg,
  enumType,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';

import { AdventureCriterias } from '../../../../_models/settings/tasks/autoAdventureSettings.js';
import { BotEvent } from '../../../../events/botEvent.js';
import { subscribeToEvent } from '../../../../pubSub.js';

export const AdventureCriteriaEnum = enumType({
  name: "AdventureCriteria",
  members: AdventureCriterias,
});

export const AutoAdventureSettings = objectType({
  name: 'AutoAdventureSettings',
  definition: t => {
    t.boolean('allow');
    t.field('coolDown', { type: 'CoolDown' });

    t.field('adventureCriteria', { type: AdventureCriteriaEnum });
    t.boolean('preferHard');
    t.int('normalMinHealth');
    t.int('hardMinHealth');
    t.field('maxTravelTime', { type: 'Duration' });
  },
});

export const UpdateAutoAdventureSettingsInput = inputObjectType({
  name: 'UpdateAutoAdventureSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.field('coolDown', { type: 'CoolDownInput' });

    t.field('adventureCriteria', { type: AdventureCriteriaEnum });
    t.boolean('preferHard');
    t.int('normalMinHealth');
    t.int('hardMinHealth');
    t.field('maxTravelTime', { type: 'DurationInput' });
  },
});

export const AutoAdventureSettingsQuery = queryField(t => {
  t.field('autoAdventureSettings', {
    type: AutoAdventureSettings,
    resolve: (_, _args, ctx) => ctx.settingsService.hero.autoAdventure.get(),
  });
});

export const UpdateAutoAdventureSettingsMutation = mutationField(t => {
  t.field('updateAutoAdventureSettings', {
    type: AutoAdventureSettings,
    args: {
      settings: arg({ type: UpdateAutoAdventureSettingsInput }),
    },
    resolve: (_, args, ctx) => ctx.settingsService.hero.autoAdventure.merge(args.settings),
  });
});

export const ResetAutoAdventureSettingsMutation = mutationField(t => {
  t.field('resetAutoAdventureSettings', {
    type: AutoAdventureSettings,
    resolve: (_, _args, ctx) => ctx.settingsService.hero.autoAdventure.reset(),
  });
});

export const AutoAdventureSettingsUpdatedSubscription = subscriptionField(t => {
  t.field('autoAdventureSettingsUpdated', {
    type: AutoAdventureSettings,
    ... subscribeToEvent(
      BotEvent.AutoAdventureSettingsUpdated,
      {
        resolve: (p) => p.settings,
      },
    ),
  });
});
