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

const getService = (villageId: string) =>
  getAccountContext().settingsService.village(villageId).autoParty;

export const AutoPartySettingsQuery = queryField(t => {
  t.field('autoPartySettings', {
    type: AutoPartySettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args) => getService(args.villageId).get(),
  });
});

export const UpdateAutoPartySettingsMutation = mutationField(t => {
  t.field('updateAutoPartySettings', {
    type: AutoPartySettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateAutoPartySettingsInput }),
    },
    resolve: (_, args) =>
      getService(args.villageId).merge(args.settings),
  });
});

export const ResetAutoPartySettingsMutation = mutationField(t => {
  t.field('resetAutoPartySettings', {
    type: AutoPartySettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args) => getService(args.villageId).reset(),
  });
});

export const AutoPartySettingsUpdatedSubscription = subscriptionField(t => {
  t.field('autoPartySettingsUpdated', {
    type: AutoPartySettings,
    args: {
      villageId: 'ID',
    },
    ...subscribeToEvent(
      BotEvent.AutoPartySettingsUpdated,
      {
        filter: (p, args) => p.villageId === args.villageId,
        resolve: (p) => p.settings,
      },
    ),
  });
});