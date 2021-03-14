import {
  arg,
  enumType,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { AdventureCriterias } from '../../../../_models/settings/tasks/autoAdventureSettings';
import { getAccountContext } from '../../../../accountContext';
import { BotEvent } from '../../../../events/botEvent';
import { subscribeToEvent } from '../../../../pubSub';

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

const getService = () => getAccountContext().settingsService.hero.autoAdventure;

export const AutoAdventureSettingsQuery = queryField(t => {
  t.field('autoAdventureSettings', {
    type: AutoAdventureSettings,
    resolve: () => getService().get(),
  });
});

export const UpdateAutoAdventureSettingsMutation = mutationField(t => {
  t.field('updateAutoAdventureSettings', {
    type: AutoAdventureSettings,
    args: {
      settings: arg({ type: UpdateAutoAdventureSettingsInput }),
    },
    resolve: (_, args) => getService().merge(args.settings),
  });
});

export const ResetAutoAdventureSettingsMutation = mutationField(t => {
  t.field('resetAutoAdventureSettings', {
    type: AutoAdventureSettings,
    resolve: () => getService().reset(),
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
